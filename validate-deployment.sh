#!/bin/bash

# Web Components Deployment Validation Script
# Validates that web components are properly implemented across the site
# Can be run locally or in CI environments

echo "🚀 Web Components Deployment Validation"
echo "======================================="

# Allow custom port for CI environments
PORT=${HUGO_TEST_PORT:-1313}
BASE_URL="http://localhost:${PORT}"

# Function to wait for server to be ready
wait_for_server() {
    local url=$1
    local max_attempts=30
    local attempt=1

    echo "Waiting for server at $url..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ Server is ready at $url"
            return 0
        fi

        echo "Attempt $attempt/$max_attempts: Server not ready, waiting..."
        sleep 2
        attempt=$((attempt + 1))
    done

    echo "❌ Server failed to start after $max_attempts attempts"
    return 1
}

# Check if Hugo server is running
if ! wait_for_server "$BASE_URL"; then
    echo "❌ Hugo server is not accessible at $BASE_URL"
    echo "Please ensure Hugo server is running on port $PORT"
    exit 1
fi

echo ""

# Test different pages and check for web components
echo "🔍 Testing pages for web component integration..."

PAGES=(
    "$BASE_URL/"
    "$BASE_URL/work/"
    "$BASE_URL/work-components-test/"
)

for page in "${PAGES[@]}"; do
    echo -n "Testing $page... "

    # Check if page loads successfully
    if curl -s "$page" > /dev/null; then
        echo "✅ Loads successfully"

        # Check for web component bundle in the HTML
        if curl -s "$page" | grep -q "js/components/index.js"; then
            echo "  ✅ Web components bundle included"
        else
            echo "  ⚠️  Web components bundle NOT found"
        fi

        # Check for work-card web components
        if curl -s "$page" | grep -q "<work-card"; then
            echo "  ✅ Work card web components found"
        else
            echo "  ℹ️  No work card web components (may be normal for this page)"
        fi

    else
        echo "❌ Failed to load"
    fi
    echo ""
done

# Check template files for proper web component usage
echo "📁 Checking template files..."

TEMPLATES=(
    "layouts/work/list.html"
    "layouts/index.html"
    "layouts/taxonomy/tag.html"
)

for template in "${TEMPLATES[@]}"; do
    echo -n "Checking $template... "

    if [ -f "$template" ]; then
        if grep -q "work-card-wc.html" "$template"; then
            echo "✅ Uses web component partial"
        else
            echo "⚠️  Still using legacy partial"
        fi
    else
        echo "❌ Template not found"
    fi
done

echo ""

# Check component files
echo "🔧 Validating component files..."

COMPONENT_FILES=(
    "assets/js/components/portfolio-lightbox.js"
    "assets/js/components/work-card.js"
    "assets/js/components/index.js"
    "layouts/partials/work-card-wc.html"
)

all_files_exist=true
for file in "${COMPONENT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing!"
        all_files_exist=false
    fi
done

echo ""

# Check if baseof.html includes web components and excludes legacy lightbox
echo "🔗 Checking baseof.html integration..."

if grep -q "js/components/index.js" layouts/_default/baseof.html; then
    echo "✅ Web components bundle included in baseof.html"
else
    echo "❌ Web components bundle NOT included in baseof.html"
fi

if grep -q "partial \"lightbox.html\"" layouts/_default/baseof.html; then
    echo "⚠️  Legacy lightbox partial still included (should be removed)"
else
    echo "✅ Legacy lightbox partial removed"
fi

echo ""

# Summary
echo "📋 Deployment Summary"
echo "===================="

if [ "$all_files_exist" = true ]; then
    echo "✅ All component files present"
else
    echo "❌ Some component files are missing"
fi

echo ""
echo "🎯 Manual Testing Checklist:"
echo "1. Visit http://localhost:1313/work/ and verify work cards display"
echo "2. Hover over work cards to see hover effects"
echo "3. Click work cards to navigate to project pages"
echo "4. Look for lightbox-trigger images and click to test lightbox"
echo "5. Test keyboard navigation (arrow keys, escape) in lightbox"
echo "6. Test touch gestures on mobile devices"
echo "7. Open browser console and verify initialization logs:"
echo "   - '🚀 Initializing Portfolio Web Components...'"
echo "   - '✅ Web Components initialized successfully'"
echo ""
echo "🔧 Developer Console Tests:"
echo "// Check if components are registered"
echo "console.log(customElements.get('work-card'));"
echo "console.log(customElements.get('portfolio-lightbox'));"
echo ""
echo "// Test utility functions"
echo "console.log(window.PortfolioComponents);"
echo ""
echo "📝 Next Steps:"
echo "1. Test thoroughly on different browsers and devices"
echo "2. Monitor performance impact (should be minimal)"
echo "3. Check analytics to ensure click tracking works"
echo "4. Consider migrating any remaining legacy components"
echo ""
echo "🚀 Web components are now deployed across your site!"

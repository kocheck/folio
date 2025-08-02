# Testing and CI/CD Configuration

## Overview

This project uses automated testing and continuous integration to ensure web components work correctly across all deployments. Tests run automatically on every push and pull request via GitHub Actions, and build-time validation occurs on Netlify.

## Testing Strategy

### 1. **Local Development Testing**

```bash
# Test web components
npm run test:components

# Validate deployment
npm run test:validate

# Test JavaScript syntax
npm run test:syntax

# Run all tests
npm run test:all
```

### 2. **GitHub Actions CI/CD**

**Workflow File**: `.github/workflows/ci-cd.yml`

**Triggers:**

- Push to `main`, `develop`, or `kyle/web-components` branches
- Pull requests to `main` or `develop`

**Test Jobs:**

#### **Component Testing**

- ✅ Hugo site builds successfully
- ✅ Web component bundle loads correctly
- ✅ JavaScript syntax validation
- ✅ Web component functionality tests
- ✅ Bundle size validation (must be under 10KB)

#### **Quality Assurance**

- ✅ HTML validation using `html-validate`
- ✅ Accessibility testing with `@axe-core/cli`
- ✅ Performance testing with Lighthouse
- ✅ Security scanning with Snyk

#### **Deployment Testing**

- ✅ Preview deployments for pull requests
- ✅ Automated testing on preview environments
- ✅ Build artifact preservation

### 3. **Netlify Build-Time Testing**

**Configuration**: `netlify.toml`

**Build Process:**

1. Install Node.js dependencies
2. Build Hugo site with minification
3. Start temporary Hugo server
4. Run web component validation tests
5. Deploy if all tests pass

### 4. **Performance Monitoring**

**Lighthouse Configuration**: `.lighthouserc.json`

**Performance Thresholds:**

- Performance Score: ≥ 90%
- Accessibility Score: ≥ 90% (required)
- Best Practices: ≥ 90%
- SEO Score: ≥ 90% (required)

**Tested Pages:**

- Homepage (`/`)
- Work listing (`/work/`)
- Web components test page (`/work-components-test/`)
- About page (`/about/`)

## Configuration Files

### `.github/workflows/ci-cd.yml`

- Complete CI/CD pipeline
- Multi-job testing strategy
- Automated deployments
- Security scanning

### `.lighthouserc.json`

- Performance testing configuration
- Accessibility requirements
- Multi-page testing setup

### `.htmlvalidate.json`

- HTML validation rules
- Web component element definitions
- Custom validation configuration

### `netlify.toml`

- Build command with integrated testing
- Environment variables
- Security headers
- Redirect rules

## Test Scripts

### `test-components.sh`

**Purpose**: Validates web components are properly implemented

**Tests:**

- Component files exist
- Hugo integration is correct
- JavaScript syntax is valid
- Server accessibility

**Usage:**

```bash
./test-components.sh
```

### `validate-deployment.sh`

**Purpose**: Comprehensive deployment validation

**Tests:**

- Server responsiveness
- Web component bundle inclusion
- Page accessibility
- Template integration
- Component functionality

**Usage:**

```bash
# Local testing
./validate-deployment.sh

# CI environment (custom port)
HUGO_TEST_PORT=8080 ./validate-deployment.sh
```

## GitHub Secrets Configuration

To enable all CI/CD features, configure these secrets in your GitHub repository:

### **Required Secrets:**

```env
NETLIFY_AUTH_TOKEN    # Netlify authentication token
NETLIFY_SITE_ID       # Your Netlify site ID
```

### **Optional Secrets:**

```env
SNYK_TOKEN           # For security vulnerability scanning
```

### **Setting up secrets:**

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with its value

## Netlify Environment Setup

### **Required Build Settings:**

- **Build command**: `npm ci && hugo --gc --minify` (or use netlify.toml)
- **Publish directory**: `public`
- **Node.js version**: `18`

### **Environment Variables:**

```env
HUGO_VERSION=0.148.1
HUGO_ENV=production
HUGO_ENABLEGITINFO=true
HUGO_EXTENDED=true
NODE_VERSION=18
```

## Monitoring and Alerts

### **GitHub Actions Notifications**

- ✅ **Success**: Green checkmarks on commits/PRs
- ❌ **Failure**: Red X marks with detailed logs
- 📊 **Artifacts**: Build outputs saved for 7 days

### **Netlify Deploy Notifications**

- Build logs available in Netlify dashboard
- Deploy previews for pull requests
- Automatic rollback on test failures

### **Performance Monitoring**

- Lighthouse reports on every PR
- Performance budgets enforced
- Accessibility compliance required

## Troubleshooting

### **Common CI Issues**

#### **Hugo Server Timeout**

```bash
# If server takes too long to start
# Increase timeout in netlify.toml:
sleep 15  # Instead of sleep 10
```

#### **Bundle Size Exceeded**

```bash
# Check component file sizes
ls -la public/js/components/

# Optimize components if needed
# Consider code splitting
```

#### **Test Script Permissions**

```bash
# Ensure scripts are executable
chmod +x test-components.sh validate-deployment.sh
```

### **Local Testing Issues**

#### **Server Not Running**

```bash
# Start Hugo server
hugo server --port 1313

# Run tests in another terminal
./validate-deployment.sh
```

#### **Port Conflicts**

```bash
# Use custom port
HUGO_TEST_PORT=3000 ./validate-deployment.sh
```

## Best Practices

### **Before Pushing Code**

1. Run local tests: `npm run test:all`
2. Test components manually in browser
3. Check browser console for errors
4. Verify responsive design

### **Pull Request Process**

1. Create feature branch
2. Make changes
3. Run local tests
4. Push to GitHub
5. Review automated test results
6. Address any failures
7. Merge after approval

### **Deployment Process**

1. Merge to main branch
2. GitHub Actions runs full test suite
3. Netlify builds and tests
4. Deploy if all tests pass
5. Monitor performance metrics

## Future Enhancements

### **Planned Additions**

- Visual regression testing
- Cross-browser testing with BrowserStack
- Performance budgets per page
- Automated SEO auditing
- End-to-end testing with Playwright

### **Monitoring Improvements**

- Real user monitoring (RUM)
- Error tracking with Sentry
- Performance alerts
- Accessibility monitoring

---

**This testing strategy ensures your web components work reliably across all environments while maintaining high performance and accessibility standards.**

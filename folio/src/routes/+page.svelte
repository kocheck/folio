<script lang="ts">
  import { onMount } from 'svelte';

  // Props for hero section
  let avatarUrl = '/images/avatar.png';
  
  // Animation states
  let isLoaded = false;
  
  onMount(() => {
    isLoaded = true;
  });
</script>

<header class="hero">
  <div class="content-wrapper">
    <div class="hero__content">
      <div class="heading-group">
        <div class="avatar-wrapper">
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <defs>
              <mask id="avatar-mask">
                <circle cx="20" cy="20" r="20" fill="white"/>
              </mask>
            </defs>
            <image
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              href={avatarUrl}
              mask="url(#avatar-mask)"
            />
          </svg>
        </div>
        <h1>I'm <span class="animate-underline">Kyle</span>,</h1>
      </div>
      
      <h2 class="h3">
        Welcome to where
        <span class="text-creative">creative vision</span> &
        <span class="text-logical">technical expertise</span> coexist in the same
        <span class="text-personality">headspace</span>.
      </h2>
      
      <p>
        Bringing it all together with user-centered solutions, pixel perfect interfaces, 
        systematic design thinking, and an unhealthy obsession with consistency.
      </p>

      <div class="hero__media-info">
        <div class="hero__media-info-block">
          <h3 class="company-status">Previously</h3>
          <p class="company-name">Roadtrippers, PokerAtlas</p>
        </div>
        <div class="hero__media-info-block"> 
          <h3 class="company-status">@ Now</h3>
          <p class="company-name">Transitioning to a new role</p>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  .container {
    padding: 2rem;
  }

  /* Import core styles from your SCSS files */
  .hero {
    padding: calc(clamp(3rem, 8vw, 8rem) + 80px) 0 clamp(6rem, 12vw, 12rem);
  }

  .content-wrapper {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .hero__content {
    flex: 1;
    max-width: 50%;
    padding: 0 clamp(1rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Add other styles from your _hero.scss */
  
  /* Add responsive styles */
  @media (max-width: 768px) {
    .hero__content {
      max-width: 100%;
    }
  }
</style>
<script lang="ts">
    import '../styles/main.css';
    import '../lib/styles/main.scss';
    import Nav from '$lib/components/Nav.svelte';
  </script>
  
  <div class="layout">
    <Nav />
    
    <main>
      <slot />
    </main>
  
    <footer>
      <p>© 2024 Kyle Kochanek</p>
    </footer>
  </div>
  
  <style>
    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  
    main {
      flex: 1;
    }
  
    footer {
      padding: 2rem;
      text-align: center;
    }
  </style>
<script lang="ts">
  import "@fontsource/poppins/700.css"; // Defaults to weight 400.
  import "@fontsource/poppins/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/700.css"; // Defaults to weight 400.

  import TopNavBar from "../components/TopNavBar/TopNavBar.svelte";
  import { isReady } from "snarkyjs";
  import { onMount } from "svelte";

  onMount(async () => {
    await isReady;
    console.log("isReady");
  });
</script>

<!-- Header -->
<container>
  <TopNavBar />

  <main>
    <slot />
  </main>
</container>

<style>
  @font-face {
    font-family: "Figtree";
    src: url("../public/fonts/Figtree/Figtree-VariableFont_wght.ttf");
  }
  container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 40px;
    position: relative;
  }
  header {
    background: #ffffff;
    font-family: "Figtree";

    /* border: 10px solid #ffffff; */
  }

  main {
    font-family: "Figtree";
    background: #ffffff;
    color: #000000;
    border: none;
  }
</style>

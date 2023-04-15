<script lang="ts">
  // variables

  let modalOpen = false;

  function toggleModal() {
    modalOpen = !modalOpen;
    console.log(modalOpen);
  }
</script>

<header-wrapper>
  <header-icon> Minamol </header-icon>
  <header-tabs>
    <header-item>
      <a href="/">Home</a>
    </header-item>
    <header-item>
      <a href="/demo">Demo</a>
    </header-item>
  </header-tabs>
</header-wrapper>

<style>
  header-wrapper {
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    gap: 64px;
    padding-left: 80px;
    padding-right: 80px;
    height: 140px;
  }
  header-icon {
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 8px;

    width: auto;
    height: 100px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 3rem;
    line-height: 36px;
  }

  header-tabs {
    /* Frame 2 */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 56px;

    width: auto;
    height: 36px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;

    color: #000000;
    font-family: "Poppins";
    font-size: 32px;
    font-weight: 400;
  }

  a {
    color: #6f6f6f;
    text-decoration: none;
  }

  a:active {
    color: black;
    background-color: transparent;
    text-decoration: underline;
  }
</style>

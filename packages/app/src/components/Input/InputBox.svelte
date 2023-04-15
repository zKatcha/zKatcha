<script lang="ts">
  import VerifyButton from "../../components/Button/VerifyButton.svelte";
  let name = "world";
</script>

<container>
  <input bind:value={name} />
  <VerifyButton />
</container>

<style>
  container {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 100%;
  }
  input {
    box-sizing: border-box;

    width: 800px;
    height: 40px;

    border: 1px solid #000000;
    border-radius: 8px;
  }
</style>

<script lang="ts">
  interface LineInfo {
    name: string;
    value: string;
  }
  export let lineInfo: LineInfo;
</script>

<container>
  <info-name>{lineInfo.name}:</info-name>
  <info-value-bg>
    <info-value>{lineInfo.value}</info-value>
  </info-value-bg>
</container>

<style>
  container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 14px;

    width: 300px;
    height: 21px;

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  info-name {
    width: 176px;
    height: 21px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;

    display: flex;
    align-items: center;

    color: #000000;

    flex: none;
    order: 0;
    flex-grow: 1;
  }
  info-value-bg {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    overflow-x: scroll;
    gap: 10px;

    width: 100%;
    height: 21px;

    background: #000000;
  }
  info-value {
    font-family: "Courier Prime";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 17px;

    display: flex;
    align-items: center;

    color: #ffffff;
    width: 100%;
  }
</style>

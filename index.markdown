---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
<style>
        .content {
      background: #00000000;
      color: #ffffff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
    }
    @media screen and (max-width: 1200px) {
      .main-area {
    margin-left: 0;
    padding: 0px;
    background-image: url('{{ page.bg1| default: "/assets/images/aleksandr.jpg" | relative_url }}');
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    background-attachment: scroll;
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
    image-rendering: pixelated;
    box-sizing: border-box;
    position: fixed;
  }
    }

</style>
---
layout: default
title:  "the master argument for trans inclusion"
subtitle: "or: induction with malintent"
date:   2026-04-01 1:56:27 -0500
image: "/assets/images/apples.png"
categories: writing
permalink: /:categories/:title/
---
<hr>
<h1>{{ page.title }}</h1>
({{ page.subtitle }})
<br>{% assign words = page.content | number_of_words %} {% assign minutes = words | divided_by: 250 | ceil %} ~{{ words }} words (~{{minutes}} minute read)
<br>{{ page.date | date: "%d %m %Y" }}
<hr>
<br>
<beginquote>Words, words words.</beginquote>
<credit>Hamlet, <i>Hamlet</i></credit>
<br>

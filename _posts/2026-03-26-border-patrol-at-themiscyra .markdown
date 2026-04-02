---
layout: default
title:  "border patrol at themiscyra"
subtitle: "or: a parable about counterexamples to self-id"
date:   2026-03-26 19:56:27 -0500
image: "/assets/images/diana.jpg"
categories: writing
permalink: /:categories/:title/
embedimage: "/assets/images/dianabig.jpg"
published: false
---
<hr>
<h1>{{ page.title }}</h1>
({{ page.subtitle }})
<br>{% assign words = page.content | number_of_words %} {% assign minutes = words | divided_by: 250 | ceil %} ~{{ words }} words (~{{minutes}} minute read)
<br>{{ page.date | date: "%d %m %Y" }}
<hr>
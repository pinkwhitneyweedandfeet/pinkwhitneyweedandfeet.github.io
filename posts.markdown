---
layout: default
title: writing
---
<style>
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 40px;
    margin-top: 20px;
  }

  .post-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #fff;
    padding-bottom: 30px;
  }

  .post-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .post-wordcount {
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    color: #d1d1d1;
    margin-bottom: 8px;
    text-align: center;
  }

</style>

<div class="posts-grid">
  {% for post in site.posts %}
  <a href="{{ post.url | relative_url }}" class="post-card">
    <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="post-image">
    <div class="post-title">{{ post.title }}</div>
    <div class="post-subtitle">{{ post.subtitle }}</div>
    {% assign words = post.content | number_of_words %}
    {% assign minutes = words | divided_by: 250 | ceil %}
    <div class="post-wordcount">{{ words }} words ({{ minutes }} min read)</div>
    <div class="post-date">{{ post.date | date: "%d-%m-%Y" }}</div>
  </a>
  {% endfor %}
</div>
---
layout: post
title: "Test if links added to the page using javascript is indexed"
subtitle: 2015-08-11
date: 2015-08-11
image: bg-image-2
---

This post is to test how and if google indexes and follows links that are added to the page via javascript.
To do that, we will add 2 links in this blog entry to different pages. The first link will be set in the source, and the second link will be set through javascript.
We will then see if and how long it takes for the pages to get indexed.

<a href="http://thomasgieling.github.io/firsttestpage.html">Link to the first page</a><br/>
<script>document.write('<a href="http://thomasgieling.github.io/secondtestpage.html">Link to the second page</a><br/>');</script>

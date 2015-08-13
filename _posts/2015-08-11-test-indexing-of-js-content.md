---
layout: post
title: "Test if links added to the page using javascript is indexed"
subtitle: 2015-08-11
date: 2015-08-11
image: bg-image-4
author: "Thomas Gieling"
---

<p>
	As part of our investigation to improve the performance of our homepage, we are trying to see what parts of the page we can load after the onload event.
	The main idea is to load everything above the fold as part of the page itself, but to load the rest through ajax. When doing this, we ofcourse want to make sure that we do not lose any SEO value.<br>	We know that these days <a href="http://googlewebmastercentral.blogspot.ca/2014/05/understanding-web-pages-better.html" target="_blank">crawlers execute javascript</a> on to render the pages and index them, but weather or not the links that are added to the page through ajax are also followed remains unclear.
</p>
<p>
	Therefore I have set up a simple test. At the bottom of this post, you can see 2 links to sample pages. One link is available in the html itself, and the other is added through a simple javascript command:
	<pre>
		<script>document.write('<a href="http://thomasgieling.github.io/secondtestpage.html">Link to the second page</a><br/>');</script>
	</pre>
	I checked to make sure that both links are visible to googlebot through the 'Fetch as Google' option in Google's Search Console.
	Here are the links:
	<a href="http://thomasgieling.github.io/firsttestpage.html">Link to the first page</a><br/>
	<script>document.write('<a href="http://thomasgieling.github.io/secondtestpage.html">Link to the second page</a><br/>');</script>
</p>

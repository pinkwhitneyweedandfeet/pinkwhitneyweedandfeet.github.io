module Jekyll
  class AuthorPageGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
  return unless site.layouts.key? 'author'
  
  authors = {}
  site.posts.docs.each do |post|
    if post.data['author'] && !post.data['author'].empty?
      author = post.data['author']
      authors[author] ||= []
      authors[author] << post
    end
  end
  
  Jekyll.logger.info "AuthorPages:", "Generating pages for #{authors.size} author(s)"
  
  authors.each do |author, posts|
    # SORT POSTS BY DATE (newest first) - this matches the layout
    sorted_posts = posts.sort_by { |p| p.date }.reverse
    
    Jekyll.logger.info "AuthorPages:", "  - #{author} (#{sorted_posts.size} post(s))"
    
    per_page = 6
    total_pages = (sorted_posts.size.to_f / per_page).ceil
    total_pages = 1 if total_pages == 0
    
    site.pages << AuthorPage.new(site, author, 1, total_pages)
    
    (2..total_pages).each do |page_num|
      site.pages << AuthorPage.new(site, author, page_num, total_pages)
    end
  end
end
end

  class AuthorPage < Page
    def initialize(site, author, page_num, total_pages)
      @site = site
      @base = site.source
      
      author_slug = Utils.slugify(author)
      
      if page_num == 1
        @dir = File.join('author', author_slug)
      else
        @dir = File.join('author', author_slug, 'page', page_num.to_s)
      end
      
      @name = 'index.html'
      
      self.process(@name)
      
      # THIS IS THE KEY: Initialize data and content
      self.data = {
        'layout' => 'author',
        'author' => author,
        'title' => "authorpage: #{author}",
        'page_num' => page_num,
        'total_pages' => total_pages
      }
      
      self.content = ''
    end
  end
end
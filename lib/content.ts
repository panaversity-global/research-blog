// Centralized content management for easy site-wide updates
export const SITE_CONTENT = {
  // Site Identity
  site: {
    name: 'Panaversity',
    tagline: 'Modern Development Insights & Best Practices',
    description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices. Stay ahead with our expert analysis and practical guides.',
    shortDescription: 'Modern Development Insights & Best Practices',
    founded: '2024',
    domain: 'panaversity.com',
    email: 'contact@panaversity.com',
    phone: '+1-555-0123',
    fax: '+1-555-0124',
  },

  // Business Information
  business: {
    name: 'Panaversity',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      countryCode: 'US',
      coordinates: {
        latitude: '37.7749',
        longitude: '-122.4194'
      }
    },
    hours: 'Mon-Fri 9AM-6PM PST',
    timezone: 'PST',
    industry: 'Technology',
    category: 'Web Development & Programming',
  },

  // Contact Information
  contact: {
    email: 'contact@panaversity.com',
    phone: '+1-555-0123',
    fax: '+1-555-0124',
    address: 'San Francisco, CA',
    responseTime: 'Within 24 hours',
    supportHours: 'Mon-Fri 9AM-6PM PST',
    social: {
      twitter: {
          handle: '@panaversity',
          url: 'https://twitter.com/panaversity',
        displayName: 'Twitter'
      },
      facebook: {
          handle: 'Panaversity',
          url: 'https://facebook.com/panaversity',
        displayName: 'Facebook'
      },
      linkedin: {
          handle: 'Panaversity',
          url: 'https://linkedin.com/company/panaversity',
        displayName: 'LinkedIn'
      },
      github: {
          handle: 'panaversity',
          url: 'https://github.com/panaversity',
        displayName: 'GitHub'
      }
    }
  },

  // Team Information
  team: {
    members: [
      {
        name: 'Alex Chen',
        role: 'Lead Developer & Founder',
        bio: 'Full-stack developer with 8+ years of experience in modern web technologies. Passionate about clean code and developer experience.',
        expertise: ['React', 'Node.js', 'TypeScript', 'AWS'],
        avatar: '/api/og?title=Alex%20Chen&description=Lead%20Developer%20%26%20Founder',
        social: {
          twitter: '@alexchen',
          linkedin: 'alexchen',
          github: 'alexchen'
        }
      },
      {
        name: 'Sarah Kim',
        role: 'Senior Frontend Engineer',
        bio: 'UI/UX specialist with deep knowledge of modern CSS frameworks and accessibility standards. Loves creating intuitive user experiences.',
        expertise: ['Vue.js', 'CSS', 'Accessibility', 'Design Systems'],
        avatar: '/api/og?title=Sarah%20Kim&description=Senior%20Frontend%20Engineer',
        social: {
          twitter: '@sarahkim',
          linkedin: 'sarahkim',
          github: 'sarahkim'
        }
      },
      {
        name: 'Mike Rodriguez',
        role: 'Backend Architect',
        bio: 'Systems architect with expertise in scalable backend solutions, microservices, and cloud infrastructure. Always thinking about performance.',
        expertise: ['Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
        avatar: '/api/og?title=Mike%20Rodriguez&description=Backend%20Architect',
        social: {
          twitter: '@mikerodriguez',
          linkedin: 'mikerodriguez',
          github: 'mikerodriguez'
        }
      },
      {
        name: 'Emma Thompson',
        role: 'DevOps Engineer',
        bio: 'Infrastructure specialist focused on automation, CI/CD pipelines, and monitoring. Believes in infrastructure as code.',
        expertise: ['Terraform', 'Jenkins', 'Prometheus', 'Linux'],
        avatar: '/api/og?title=Emma%20Thompson&description=DevOps%20Engineer',
        social: {
          twitter: '@emmathompson',
          linkedin: 'emmathompson',
          github: 'emmathompson'
        }
      }
    ],
    stats: [
      { label: 'Articles Published', value: '150+', icon: 'BookOpen' },
      { label: 'Monthly Readers', value: '50K+', icon: 'Users' },
      { label: 'Code Examples', value: '500+', icon: 'Code' },
      { label: 'Countries Reached', value: '45+', icon: 'Globe' }
    ],
    values: [
      {
        title: 'Quality First',
        description: 'We never compromise on the quality of our content. Every article is thoroughly researched and tested.',
        icon: 'Award'
      },
      {
        title: 'Community Driven',
        description: 'Our content is shaped by the developer community. We listen, learn, and adapt based on your feedback.',
        icon: 'Users'
      },
      {
        title: 'Always Learning',
        description: 'Technology evolves rapidly, and so do we. We stay current with the latest trends and best practices.',
        icon: 'BookOpen'
      },
      {
        title: 'Innovation Focused',
        description: 'We explore cutting-edge technologies and share practical insights that help developers stay ahead.',
        icon: 'Zap'
      }
    ]
  },

  // Navigation
  navigation: {
    main: [
      { name: 'Home', href: '/', description: 'Main homepage' },
      { name: 'Blog', href: '/blog', description: 'All blog posts' },
      { name: 'About', href: '/about', description: 'About our team' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
      { name: 'Search', href: '/search', description: 'Search articles' },
    ],
    resources: [
      { name: 'Sitemap', href: '/sitemap.xml', description: 'Site structure' },
      { name: 'Latest Posts', href: '/blog', description: 'Recent articles' },
      { name: 'Popular Tags', href: '/search', description: 'Browse by topic' },
    ],

    footer: [
      { name: 'About Us', href: '/about', description: 'Learn about Panaversity' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
      { name: 'Careers', href: '/careers', description: 'Join our team' },
      { name: 'Press Kit', href: '/press', description: 'Media resources' }
    ]
  },

  // Page Content
  pages: {
    home: {
      hero: {
        title: 'Modern Development',
        subtitle: 'Insights & Best Practices',
        description: 'Stay ahead with expert analysis, tutorials, and insights into modern web development, technology trends, and coding best practices.',
        cta: {
          primary: {
            text: 'Explore Articles',
            href: '/blog',
            description: 'Browse our collection of articles'
          },
          secondary: {
            text: 'Learn More',
            href: '/about',
            description: 'About our mission and team'
          }
        }
      },
      featured: {
        title: 'Featured Articles',
        description: 'Discover our latest insights, tutorials, and deep dives into modern web development',
        cta: {
          text: 'View All Articles',
          href: '/blog',
          description: 'See complete article collection'
        }
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Get the latest articles and insights delivered to your inbox.',
        placeholder: 'Enter your email',
        button: 'Subscribe',
        success: 'Successfully subscribed!',
        error: 'Subscription failed. Please try again.'
      }
    },
    about: {
      title: 'About Us',
      subtitle: 'Our Mission & Team',
      description: 'Learn about Panaversity, our mission to share cutting-edge web development insights, and our commitment to helping developers grow.',
      mission: {
        title: 'Our Mission',
        description: 'To empower developers with cutting-edge insights, practical knowledge, and industry best practices that accelerate their growth and success.',
        goals: [
          'Share practical, actionable insights',
          'Cover emerging technologies and trends',
          'Build a supportive developer community',
          'Maintain the highest content quality standards'
        ]
      },
      story: {
        title: 'Our Story',
        description: 'Founded in 2024, Panaversity emerged from a simple observation: developers needed a reliable source for practical, up-to-date technology insights.',
        milestones: [
          {
            year: '2024',
            title: 'Foundation',
            description: 'Panaversity launched with a mission to share quality development insights'
          },
          {
            year: '2024',
            title: 'Growth',
            description: 'Reached 50K+ monthly readers and published 150+ articles'
          },
          {
            year: '2025',
            title: 'Expansion',
            description: 'Expanding into new technology domains and community features'
          }
        ]
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get In Touch',
      description: 'Get in touch with the Panaversity team. We\'d love to hear from you about collaborations, feedback, or any questions you might have.',
      form: {
        title: 'Send us a message',
        description: 'We\'ll get back to you within 24 hours',
        fields: {
          name: {
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
          },
          email: {
            label: 'Email Address',
            placeholder: 'Enter your email address',
            required: true
          },
          subject: {
            label: 'Subject',
            placeholder: 'What is this about?',
            required: true
          },
          message: {
            label: 'Message',
            placeholder: 'Tell us more about your inquiry...',
            required: true,
            rows: 5
          }
        },
        submit: 'Send Message',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        error: 'Failed to send message. Please try again.'
      },
      info: {
        title: 'Contact Information',
        description: 'Multiple ways to reach our team',
        methods: [
          {
            title: 'Email',
            value: 'contact@panaversity.com',
            description: 'Send us an email anytime',
            link: 'mailto:contact@panaversity.com',
            icon: 'Mail'
          },
          {
            title: 'Phone',
            value: '+1 (555) 012-3456',
            description: 'Mon-Fri from 9am to 6pm',
            link: 'tel:+15550123456',
            icon: 'Phone'
          },
          {
            title: 'Office',
            value: 'San Francisco, CA',
            description: 'Visit us in person',
            link: '#',
            icon: 'MapPin'
          },
          {
            title: 'Response Time',
            value: 'Within 24 hours',
            description: 'We\'ll get back to you quickly',
            link: '#',
            icon: 'Clock'
          }
        ]
      }
    },
    blog: {
      title: 'Blog',
      subtitle: 'Latest Articles & Insights',
      description: 'Explore our collection of web development articles, programming tutorials, and technology insights. Stay updated with the latest trends and best practices.',
      filters: {
        all: 'All Posts',
        featured: 'Featured',
        latest: 'Latest',
        popular: 'Popular',
        search: 'Search articles...',
        noResults: 'No articles found matching your search.',
        categories: 'Categories',
        tags: 'Tags'
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
        showing: 'Showing',
        to: 'to',
        ofTotal: 'of',
        results: 'results'
      }
    },
    search: {
      title: 'Search',
      subtitle: 'Find What You Need',
      description: 'Search through our comprehensive collection of web development articles, tutorials, and technology insights. Find exactly what you need to advance your skills.',
      placeholder: 'Search articles, tutorials, and insights...',
      noResults: 'No results found for your search.',
      suggestions: 'Try these suggestions:',
      filters: {
        title: 'Filter Results',
        category: 'Category',
        date: 'Date Range',
        author: 'Author',
        tags: 'Tags',
        clear: 'Clear Filters'
      }
    }
  },



  // SEO Content
  seo: {
    keywords: [
      'web development',
      'programming',
      'software engineering',
      'frontend development',
      'backend development',
      'full-stack development',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'database design',
      'API development',
      'cloud computing',
      'devops',
      'software architecture',
      'coding best practices',
      'technology trends',
      'developer tools'
    ],
    categories: [
      'Technology',
      'Web Development',
      'Programming',
      'Software Engineering',
      'DevOps',
      'Cloud Computing',
      'Database Design',
      'API Development'
    ],
    defaultMeta: {
      title: 'Panaversity - Modern Development Insights & Best Practices',
      description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices. Stay ahead with our expert analysis and practical guides.',
      keywords: 'web development, programming, software engineering, technology, coding best practices',
      author: 'Panaversity Team',
      publisher: 'Panaversity',
      category: 'technology'
    }
  },

  // Social Media
  social: {
    platforms: [
      {
        name: 'Twitter',
          handle: '@panaversity',
          url: 'https://twitter.com/panaversity',
        icon: 'Twitter',
        description: 'Follow us on Twitter for latest updates'
      },
      {
        name: 'Facebook',
          handle: 'Panaversity',
          url: 'https://facebook.com/panaversity',
        icon: 'Facebook',
        description: 'Like us on Facebook'
      },
      {
        name: 'LinkedIn',
          handle: 'Panaversity',
          url: 'https://linkedin.com/company/panaversity',
        icon: 'LinkedIn',
        description: 'Connect with us on LinkedIn'
      },
      {
        name: 'GitHub',
          handle: 'panaversity',
          url: 'https://github.com/panaversity',
        icon: 'GitHub',
        description: 'Check out our projects on GitHub'
      }
    ],
    sharing: {
      title: 'Share This Article',
      description: 'Help others discover this content',
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'Email']
    }
  },

  // Newsletter
  newsletter: {
    title: 'Stay Updated',
    description: 'Get the latest articles and insights delivered to your inbox.',
    placeholder: 'Enter your email',
    button: 'Subscribe',
    success: 'Successfully subscribed!',
    error: 'Subscription failed. Please try again.',
    privacy: 'Unsubscribe at any time.',
    frequency: 'Weekly digest of our best content'
  },

  // Footer
  footer: {
    tagline: 'Modern Development Insights & Best Practices',
    description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices.',
    copyright: '© 2025 Panaversity. All rights reserved.',
    madeWith: 'Made with ❤️ using Next.js',
    poweredBy: 'Powered by Tailwind CSS',
    links: {
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
      social: 'Follow Us'
    }
  }
}

// Helper functions for easy content access
export const getContent = (path: string) => {
  const keys = path.split('.')
  let current: any = SITE_CONTENT
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }
  
  return current
}

export const getTeamMember = (name: string) => {
  return SITE_CONTENT.team.members.find(member => 
    member.name.toLowerCase() === name.toLowerCase()
  )
}

export const getSocialLink = (platform: string) => {
  return SITE_CONTENT.social.platforms.find(p => 
    p.name.toLowerCase() === platform.toLowerCase()
  )
}

export const getNavigationItem = (name: string) => {
  return SITE_CONTENT.navigation.main.find(item => 
    item.name.toLowerCase() === name.toLowerCase()
  )
}

// Type definitions for better TypeScript support
export type SiteContent = typeof SITE_CONTENT
export type TeamMember = typeof SITE_CONTENT.team.members[0]
export type SocialPlatform = typeof SITE_CONTENT.social.platforms[0]
export type NavigationItem = typeof SITE_CONTENT.navigation.main[0]

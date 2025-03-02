// Add smooth reveal animations for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (sectionTop < windowHeight - 100) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Previous initialization code...

  // Initialize section reveal animations
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "all 0.6s ease"
  })

  window.addEventListener("scroll", revealSections)
  revealSections() // Initial check
  // Initialize Isotope for portfolio filtering
  const portfolioContainer = document.querySelector(".portfolio-container")
  if (portfolioContainer) {
    // Assuming Isotope is a global variable or loaded via a script tag
    // If not, you'll need to import it using a module bundler like Webpack
    // For example: import Isotope from 'isotope-layout';
    const Isotope = window.Isotope // Declare Isotope variable

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    })

    const portfolioFilters = document.querySelectorAll("#portfolio-filters li")

    portfolioFilters.forEach((filter) => {
      filter.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove 'filter-active' class from all filters
        portfolioFilters.forEach((el) => {
          el.classList.remove("filter-active")
        })

        // Add 'filter-active' class to clicked filter
        this.classList.add("filter-active")

        // Filter items
        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        })
      })
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show")
        }
      }
    })
  })

  // Back to top button
  const backToTop = document.querySelector(".back-to-top")
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        backToTop.classList.add("active")
      } else {
        backToTop.classList.remove("active")
      }
    })

    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Form validation
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true
      const formMessage = document.querySelector(".form-message")

      // Simple validation
      const name = document.getElementById("name")
      const email = document.getElementById("email")
      const subject = document.getElementById("subject")
      const message = document.getElementById("message")

      if (!name.value.trim()) {
        name.classList.add("is-invalid")
        isValid = false
      } else {
        name.classList.remove("is-invalid")
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        email.classList.add("is-invalid")
        isValid = false
      } else {
        email.classList.remove("is-invalid")
      }

      if (!subject.value.trim()) {
        subject.classList.add("is-invalid")
        isValid = false
      } else {
        subject.classList.remove("is-invalid")
      }

      if (!message.value.trim()) {
        message.classList.add("is-invalid")
        isValid = false
      } else {
        message.classList.remove("is-invalid")
      }

      if (isValid) {
        // Simulate form submission
        formMessage.innerHTML = '<div class="alert alert-success">Your message has been sent. Thank you!</div>'
        contactForm.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          formMessage.innerHTML = ""
        }, 5000)
      } else {
        formMessage.innerHTML = '<div class="alert alert-danger">Please fill all required fields correctly.</div>'
      }
    })
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Add active class to nav links on scroll
  function highlightNavLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Animate progress bars when in viewport
  function animateProgressBars() {
    const skillsSection = document.querySelector(".skills")
    if (skillsSection) {
      const progressBars = document.querySelectorAll(".progress")
      const windowHeight = window.innerHeight
      const skillsPosition = skillsSection.getBoundingClientRect().top

      if (skillsPosition < windowHeight - 100) {
        progressBars.forEach((progress) => {
          const progressBar = progress.querySelector(".progress-bar")
          const valueContainer = progress.querySelector(".val")
          const value = Number.parseInt(valueContainer.textContent)

          // Set custom property for progress width
          progressBar.style.setProperty("--progress-width", `${value}%`)

          // Add animation class
          progress.classList.add("animate")

          // Animate the percentage number
          let startValue = 0
          const duration = 2000
          const increment = value / (duration / 16) // 16ms is roughly one frame at 60fps

          const counter = setInterval(() => {
            startValue += increment
            if (startValue >= value) {
              valueContainer.textContent = value
              clearInterval(counter)
            } else {
              valueContainer.textContent = Math.floor(startValue)
            }
          }, 16)
        })

        // Remove event listener after animation
        window.removeEventListener("scroll", animateProgressBars)
      }
    }
  }

  window.addEventListener("scroll", animateProgressBars)

  // Initial call to set active nav link and animate progress bars if in view
  highlightNavLink()
  animateProgressBars()
})


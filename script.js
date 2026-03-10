// script.js — a11y + performance baseline

const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false

document.addEventListener("DOMContentLoaded", () => {
  // 1) Stängbar annons (om den finns)
  const ad = document.querySelector("#fake-ad")
  if (ad) {
    // Skapa en riktig stängknapp om den saknas
    let closeBtn = ad.querySelector(".ad-close")
    if (!closeBtn) {
      closeBtn = document.createElement("button")
      closeBtn.type = "button"
      closeBtn.className = "ad-close"
      closeBtn.textContent = "Stäng"
      closeBtn.setAttribute("aria-label", "Stäng annons")
      ad.prepend(closeBtn)
    }

    closeBtn.addEventListener("click", () => {
      ad.remove()
      // Flytta fokus till något rimligt efter borttagning
      const main = document.querySelector("#main")
      main?.focus?.()
    })
  }

  // 2) Exempel: statusmeddelande utan alert (om du har en #status)
  const status = document.querySelector("#status")
  if (status) {
    status.textContent = "Sidan är laddad."
  }

  // 3) Exempel: om du vill ha en “byt tema”-knapp (endast vid user action)
  const themeToggle = document.querySelector("#theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("theme-alt")
    })
  }

  // 4) Stäng av tunga animationer via klass om reduced motion
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion")
  }
})
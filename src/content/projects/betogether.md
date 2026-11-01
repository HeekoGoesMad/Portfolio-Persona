---
title: "BeTogether"
summary: "A real-time social location-sharing app built with Flutter, Firebase, Riverpod, and OpenStreetMap for staying connected with close friends."
role: "Lead Mobile & Full-Stack Developer"
technologies: ["Flutter", "Dart", "Firebase", "Riverpod", "OpenStreetMap"]
date: 2026-10-14
thumbnail: /art/betogether.svg
thumbnailAlt: "BeTogether concept artwork showing a stylized tactical radar map and real-time social nodes"
order: 1
featured: true
hidden: false
category: "Social Location & Mobile"
accent: cyan
repository: "https://github.com/HeekoGoesMad/betogether"
demo: "https://github.com/HeekoGoesMad/betogether"
example: false
draft: false
architectureOverview: "Feature-modular Flutter 3.44 client using Riverpod reactive streams decoupled from an OpenStreetMap tile/marker engine, synchronized via Cloud Firestore, Firebase Auth, and Cloudinary media pipelines."
deliverables:
  - "Real-time friend pin & group cluster radar on OpenStreetMap"
  - "Ephemeral location-tagged photo stories with Cloudinary WebP delivery"
  - "Granular ghost-mode & friend-tier privacy controls"
  - "140 automated Flutter widget and unit tests"
gallery:
  - src: "/art/betogether.svg"
    alt: "BeTogether interactive radar map and social presence clusters"
    caption: "Tactical friend radar & live OpenStreetMap presence layer."
  - src: "/persona/artbook/yukari.jpg"
    alt: "Stylized character UI inspiration from Persona 3 Reload"
    caption: "High-contrast social link badges & status overlays."
---

## The idea

Location sharing apps often trade privacy and battery life for cluttered social feeds. **BeTogether** focuses on low-latency, high-trust presence between close friends—combining live OpenStreetMap rendering, nearby group discovery, and ephemeral photo stories in an expressive Android-first Flutter experience.

## The approach

We designed the architecture around clean feature modules (`auth`, `onboarding`, `friends`, `map`, `stories`, and `notifications`) backed by Riverpod state management and Cloud Firestore streams. Map markers and nearby friend clusters update smoothly without blocking the UI thread.

## Design decisions

Separate real-time geolocation streams from heavy UI rebuilds. Keep permission states, offline caching, and friend visibility controls explicit so users always know when and how their location is shared.

### What matters in the interface

- **Clarity:** live friend pins, nearby group flames, and story rings are legible at a glance on the interactive map.
- **Accessibility:** high-contrast map controls, semantic labels, and keyboard/screen-reader tested navigation flows.
- **Feedback:** immediate visual confirmation when updating status, sharing stories, or toggling location visibility.

## Building it

Built with **Flutter 3.44** and **Dart 3.12**, using **Firebase** (Auth, Firestore, Messaging) for real-time synchronization, **OpenStreetMap** for crisp vector/tile mapping, and **Cloudinary** for optimized story media delivery. Verified with 140 automated widget and unit tests across map and onboarding flows.

## Reflection

Separating the map controller lifecycle from the social state graph prevented frame drops during rapid camera pans and multi-user coordinate updates. Security rules and credential boundaries were hardened to keep outbound notifications on trusted server paths.

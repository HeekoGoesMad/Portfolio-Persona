---
title: "Afterhours"
summary: "A music discovery concept for the moments between one day and the next."
role: "Example: frontend development & interaction design"
technologies: ["React", "TypeScript", "Web Audio"]
date: 2026-10-01
thumbnail: /art/afterhours.svg
thumbnailAlt: "Original abstract concept cover for Afterhours, an illustrative project"
order: 1
featured: true
category: "Music discovery"
accent: cyan
example: true
draft: false
---

## The idea

Help a listener find a track without turning discovery into an endless feed. This illustrative brief asks what a small, intentional listening space could feel like.

## The approach

A focused queue, a clear play state, and an interface that gives artwork room to breathe. Keyboard access is part of the interaction model from the beginning.

## Design decisions

Separate playback state from presentation. Keep loading, empty, playing, and unavailable states explicit. Build a small set of reusable controls instead of treating every screen as a new interface.

### What matters in the interface

- **Clarity:** the next action should be easy to identify.
- **Accessibility:** every essential control should work with a keyboard.
- **Feedback:** state changes should be visible without relying on sound or motion.

## Building it

Use React for stateful controls, TypeScript for track and queue contracts, and Web Audio only where the browser supports it. This is an example implementation direction, not a claim that this application has been built.

## Reflection

The concept provides a case-study structure for discussing interface decisions and tradeoffs. Add real screenshots, repository and demo links, and actual findings when you replace this example.

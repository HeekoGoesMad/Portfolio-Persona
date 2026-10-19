---
title: "Form & Function"
summary: "An interface playground exploring the small details that make everyday controls feel right."
role: "Example: frontend development & interaction design"
technologies: ["CSS", "TypeScript", "Accessibility"]
date: 2026-10-01
thumbnail: /art/form-and-function.svg
thumbnailAlt: "Original abstract concept cover for Form & Function, an illustrative project"
order: 3
featured: false
category: "Interaction experiments"
accent: lime
example: true
draft: false
---

## The idea

Small controls can make an interface feel either precise or frustrating. This illustrative project studies focus, feedback, and state transitions through a collection of component experiments.

## The approach

Treat each experiment as a real control with keyboard, pointer, touch, and reduced-motion states. Visual polish follows a clear interaction contract.

## Design decisions

Start with native semantics. Define idle, focus, hover, active, disabled, and error states. Tune movement only after those states are understandable without animation.

### What matters in the interface

- **Clarity:** the next action should be easy to identify.
- **Accessibility:** every essential control should work with a keyboard.
- **Feedback:** state changes should be visible without relying on sound or motion.

## Building it

Use CSS transforms and opacity for short transitions, with TypeScript only for state changes that cannot be expressed with native HTML. Keep examples independent so they can be tested in isolation.

## Reflection

This example shows how to discuss craft without inventing performance gains. Replace it with your own components, working demos, and measured observations.

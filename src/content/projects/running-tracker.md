---
title: "Running Tracker"
summary: "An offline-first Android GPS running tracker and adaptive training coach built with Kotlin, Jetpack Compose, Room, and MapLibre Native."
role: "Android & Systems Architect"
technologies: ["Kotlin", "Jetpack Compose", "Room", "MapLibre", "Android"]
date: 2026-10-24
thumbnail: /art/running-tracker.svg
thumbnailAlt: "Running Tracker artwork with Midnight Channel yellow framing and cyan GPS route telemetry"
order: 3
featured: false
category: "Fitness & GPS Telemetry"
accent: lime
repository: "https://github.com/HeekoGoesMad"
example: false
draft: false
---

## The idea

Many running apps lock your own workout history and training plans behind mandatory accounts and subscriptions. **Running Tracker** is a privacy-first, zero-subscription Android application with reliable locked-screen GPS recording, local Room persistence, deterministic adaptive coaching, and rich route visualizations.

## The approach

A dedicated Android foreground location service owns GPS capture independently of the UI lifecycle, surviving screen locks and process interruptions. A pure-Kotlin coach engine evaluates completed workouts against your schedule and proposes transparent, reviewable plan adaptations without ever overwriting manual edits silently.

## Design decisions

Local storage is authoritative: **Room** manages workouts, route geometry, and shoe mileage, while **DataStore** handles preferences. **MapLibre Native** with OpenFreeMap tiles renders routes and personal heatmaps with graceful route-only geometry fallbacks when offline.

### What matters in the interface

- **Clarity:** high-contrast outdoor telemetry screens designed for split-second readability while in motion.
- **Accessibility:** large touch targets, spoken audio cues during structured intervals, and WCAG-verified contrast tokens across light and dark themes.
- **Feedback:** deterministic coach adaptation diffs that explain *why* a workout adjustment is suggested before you accept or reject it.

## Building it

Architected with **Kotlin** and **Jetpack Compose** across 84 designed and verified UI/UX frames covering live recording, interval guidance, calendar ICS synchronization, alpha PNG route overlays for photo sharing, and duplicate-safe GPX import/export.

## Reflection

Treating GPS recording and crash recovery as the first engineering gate ensured that telemetry integrity never takes a backseat to UI polish. Designing 84 complete flow frames upfront made edge cases—like GPS signal loss, paused intervals, and schema migrations—explicit from day one.

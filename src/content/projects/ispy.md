---
title: "iSpy Analytics"
summary: "A full-stack social opinion and sentiment intelligence dashboard powered by FastAPI, Celery, HuggingFace RoBERTa/DeBERTa NLP, and Next.js."
role: "Full-Stack & NLP Engineer"
technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "HuggingFace NLP", "MongoDB"]
date: 2026-09-20
thumbnail: /art/ispy.svg
thumbnailAlt: "iSpy Analytics artwork featuring Phantom Thieves red-and-black data bars and yellow sentiment trend lines"
order: 2
featured: false
category: "AI & Social Analytics"
accent: pink
repository: "https://github.com/HeekoGoesMad"
example: false
draft: false
---

## The idea

What does the internet actually think about any topic right now? Given a query like a product launch or a policy debate, **iSpy** ingests public discussions from Reddit and X/Twitter, deduplicates and filters posts by language, and surfaces volume trends, sentiment polarity, and agree/disagree stance in a live dashboard.

## The approach

Rather than relying on expensive proprietary LLM APIs for every post, iSpy runs an asynchronous local NLP pipeline via **Celery** and **Redis**, feeding cleaned text into specialized HuggingFace transformer models (`twitter-roberta` for sentiment and `deberta-v3-base-zeroshot` for stance classification).

## Design decisions

Decouple ingestion and heavy transformer inference from the web request cycle. Store raw posts, analyzed documents, and aggregated topic scores in **MongoDB** so the **FastAPI** backend can serve instant summaries to the **Next.js** frontend.

### What matters in the interface

- **Clarity:** complex multi-dimensional NLP scores are distilled into immediate volume timelines, sentiment splits, and stance breakdowns.
- **Accessibility:** semantic data tables, clear color-plus-label encoding for sentiment states, and full keyboard navigation.
- **Feedback:** live job progress indicators from queue ingestion through transformer scoring to dashboard readiness.

## Building it

Constructed as a multi-service architecture: Python PRAW and Playwright adapters for ingestion, Celery + Redis workers running PyTorch/HuggingFace pipelines, FastAPI + Motor for async MongoDB queries, and a Next.js + TypeScript + Tailwind + Recharts dashboard.

## Reflection

Running zero-shot stance detection alongside sentiment revealed nuances that simple positive/negative classifiers miss—such as users expressing negative sentiment while agreeing with a critique. Shared Pydantic schemas across scraper, worker, and API kept data contracts rock solid.

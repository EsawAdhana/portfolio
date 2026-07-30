"use client";

import { useEffect } from "react";
import { HumanBehaviorTracker } from "humanbehavior-js";

let initialized = false;

export function HumanBehaviorInit() {
  useEffect(() => {
    if (initialized) return;

    const apiKey = process.env.NEXT_PUBLIC_HUMANBEHAVIOR_API_KEY;
    if (!apiKey) return;

    initialized = true;
    HumanBehaviorTracker.init(apiKey, {
      ingestionUrl:
        process.env.NEXT_PUBLIC_HUMANBEHAVIOR_INGESTION_URL ??
        "https://ingest.humanbehavior.co",
    });
  }, []);

  return null;
}

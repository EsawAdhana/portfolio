"use client";

import { useEffect } from "react";
import { HumanBehaviorTracker } from "humanbehavior-js";

let initialized = false;

export default function HumanBehaviorInit() {
  useEffect(() => {
    if (initialized) return;

    const apiKey = process.env.NEXT_PUBLIC_HB_API_KEY;
    if (!apiKey) return;

    initialized = true;
    HumanBehaviorTracker.init(apiKey, {
      ingestionUrl:
        process.env.NEXT_PUBLIC_HB_INGESTION_URL ?? "http://localhost:8000",
    });
  }, []);

  return null;
}

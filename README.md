# Peak Listings Tracker

A TypeScript solution for finding the maximum number of concurrent property listings in a real-time feed.

## Problem

Given a dataset of property listings with start and end times, determine the peak number of listings that were live simultaneously during any moment in a 24-hour period.

## Solution

Uses an efficient event-based algorithm:
1. Convert each listing into timeline events (+1 for start, -1 for end)
2. Sort events chronologically
3. Process events to track concurrent count and find the peak

**Time Complexity:** O(n log n) due to sorting  
**Space Complexity:** O(n) for events array

## Usage

```typescript
import { findPeakListings } from './src/index';

const listings = [
  { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T12:00:00" },
  { listing_id: "L2", start_time: "2025-03-10T11:00:00", end_time: null } // Still active
];

const peak = findPeakListings(listings);
console.log(peak); // 2
```

## Scripts

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode  
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
src/
├── index.ts          # Main implementation
├── index.test.ts     # Test suite
├── types.ts          # Type definitions
└── listingsData.ts   # Sample data
```
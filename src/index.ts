import { listingsData } from "./listingsData";
import { Listing, TimelineEvent } from "./types";

/**
 * Finds the peak number of concurrently active listings.
 *
 * This algorithm converts time intervals into points on a timeline
 * (+1 for a start, -1 for an end), sorts them chronologically,
 * and then iterates through the events to find the highest concurrent count.
 */
const findPeakListings = (listings: Listing[]): number => {
    
    // Use flatMap to elegantly transform each listing into one or two
    // corresponding events (a start and, optionally, an end).
    const events = listings.flatMap(({ start_time, end_time }) => {
        const timelineEvents: TimelineEvent[] = [{ time: start_time, change: 1 }];
        if (end_time) {
            timelineEvents.push({ time: end_time, change: -1 });
        }
        return timelineEvents;
    });

    events.sort((a, b) => a.time.localeCompare(b.time));

    let peakCount = 0;
    let currentCount = 0;

    for (const event of events) {
        currentCount += event.change;
        peakCount = Math.max(peakCount, currentCount);
    }

    return peakCount;
};

const peak = findPeakListings(listingsData);
console.log(`Peak number of concurrent listings: ${peak}`); // Result: 7
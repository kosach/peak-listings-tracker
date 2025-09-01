import { Listing } from './types';

const findPeakListings = (listings: Listing[]): number => {
    const events = listings.flatMap(({ start_time, end_time }) => {
        const timelineEvents = [{ time: start_time, change: 1 }];
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

describe('findPeakListings', () => {
    test('empty array returns 0', () => {
        expect(findPeakListings([])).toBe(0);
    });

    test('single listing', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" }
        ];
        expect(findPeakListings(listings)).toBe(1);
    });

    test('single active listing (no end_time)', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: null }
        ];
        expect(findPeakListings(listings)).toBe(1);
    });

    test('non-overlapping listings', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T09:00:00", end_time: "2025-03-10T10:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" },
            { listing_id: "L3", start_time: "2025-03-10T11:00:00", end_time: "2025-03-10T12:00:00" }
        ];
        expect(findPeakListings(listings)).toBe(1);
    });

    test('completely overlapping listings', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T12:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:30:00", end_time: "2025-03-10T11:30:00" },
            { listing_id: "L3", start_time: "2025-03-10T10:45:00", end_time: "2025-03-10T11:15:00" }
        ];
        expect(findPeakListings(listings)).toBe(3);
    });

    test('partially overlapping listings', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:30:00", end_time: "2025-03-10T11:30:00" },
            { listing_id: "L3", start_time: "2025-03-10T11:00:00", end_time: "2025-03-10T12:00:00" }
        ];
        expect(findPeakListings(listings)).toBe(2);
    });

    test('listings with simultaneous start/end times', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T11:00:00", end_time: "2025-03-10T12:00:00" },
            { listing_id: "L3", start_time: "2025-03-10T10:30:00", end_time: "2025-03-10T10:30:00" }
        ];
        expect(findPeakListings(listings)).toBe(2);
    });

    test('mix of active and ended listings', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:30:00", end_time: null },
            { listing_id: "L3", start_time: "2025-03-10T10:45:00", end_time: "2025-03-10T11:30:00" },
            { listing_id: "L4", start_time: "2025-03-10T11:15:00", end_time: null }
        ];
        expect(findPeakListings(listings)).toBe(3);
    });

    test('provided example dataset', () => {
        const listings: Listing[] = [
            { listing_id: "L505", start_time: "2025-03-10T12:00:00", end_time: "2025-03-10T15:30:00" },
            { listing_id: "L101", start_time: "2025-03-10T08:00:00", end_time: "2025-03-10T12:30:00" },
            { listing_id: "L404", start_time: "2025-03-10T11:30:00", end_time: "2025-03-10T14:00:00" },
            { listing_id: "L303", start_time: "2025-03-10T10:00:00", end_time: null },
            { listing_id: "L202", start_time: "2025-03-10T09:15:00", end_time: "2025-03-10T13:45:00" },
            { listing_id: "L606", start_time: "2025-03-10T13:00:00", end_time: "2025-03-10T16:00:00" },
            { listing_id: "L707", start_time: "2025-03-10T14:15:00", end_time: "2025-03-10T17:30:00" },
            { listing_id: "L808", start_time: "2025-03-10T15:00:00", end_time: null },
            { listing_id: "L909", start_time: "2025-03-10T10:45:00", end_time: "2025-03-10T12:45:00" },
            { listing_id: "L110", start_time: "2025-03-10T16:30:00", end_time: "2025-03-10T18:30:00" },
            { listing_id: "L111", start_time: "2025-03-10T07:30:00", end_time: "2025-03-10T09:45:00" },
            { listing_id: "L112", start_time: "2025-03-10T09:00:00", end_time: "2025-03-10T10:30:00" },
            { listing_id: "L113", start_time: "2025-03-10T14:00:00", end_time: "2025-03-10T15:45:00" },
            { listing_id: "L114", start_time: "2025-03-10T11:15:00", end_time: "2025-03-10T13:30:00" },
            { listing_id: "L115", start_time: "2025-03-10T12:45:00", end_time: "2025-03-10T16:15:00" }
        ];
        expect(findPeakListings(listings)).toBe(7);
    });

    test('edge case: all listings start at same time', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T11:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T12:00:00" },
            { listing_id: "L3", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T13:00:00" }
        ];
        expect(findPeakListings(listings)).toBe(3);
    });

    test('edge case: all listings end at same time', () => {
        const listings: Listing[] = [
            { listing_id: "L1", start_time: "2025-03-10T08:00:00", end_time: "2025-03-10T12:00:00" },
            { listing_id: "L2", start_time: "2025-03-10T10:00:00", end_time: "2025-03-10T12:00:00" },
            { listing_id: "L3", start_time: "2025-03-10T11:00:00", end_time: "2025-03-10T12:00:00" }
        ];
        expect(findPeakListings(listings)).toBe(3);
    });
});
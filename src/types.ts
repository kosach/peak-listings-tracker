export type TimelineEvent = {
  time: string;
  // +1 for when a listing appears; -1 for when it's removed
  change: 1 | -1;
};export interface Listing {
  listing_id: string;
  start_time: string;
  end_time: string | null;
}


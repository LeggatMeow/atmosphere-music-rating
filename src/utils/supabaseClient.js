import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upsert a user's rating for a track.
 * Expects a `ratings` table with columns: user_id, track_id, rating, album_title, track_title
 */
export async function submitRating({ userId, trackId, rating, albumTitle, trackTitle }) {
	if (!userId) {
		throw new Error('Missing userId for submitRating');
	}

	const payload = {
		user_id: userId,
		track_id: trackId,
		rating: rating,
		album_title: albumTitle || null,
		track_title: trackTitle || null,
	};

	const { data, error } = await supabase
		.from('ratings')
		.upsert(payload, { onConflict: ['user_id', 'track_id'], returning: 'minimal' });

	if (error) {
		console.error('submitRating error', error);
		throw error;
	}

	return data;
}

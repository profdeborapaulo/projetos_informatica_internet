import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEOAPIFY_API_KEY = Deno.env.get('GEOAPIFY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { originLat, originLon, destLat, destLon } = await req.json();

    console.log('Calculating distance from', originLat, originLon, 'to', destLat, destLon);

    // Use Geoapify Routing API
    const url = new URL('https://api.geoapify.com/v1/routing');
    url.searchParams.append('waypoints', `${originLat},${originLon}|${destLat},${destLon}`);
    url.searchParams.append('mode', 'drive');
    url.searchParams.append('apiKey', GEOAPIFY_API_KEY!);

    const response = await fetch(url.toString());
    const data = await response.json();

    console.log('Geoapify response:', data);

    if (!data.features || data.features.length === 0) {
      throw new Error('Route not found');
    }

    const route = data.features[0];
    const distanceInMeters = route.properties.distance;
    const distanceInKm = distanceInMeters / 1000;
    const durationInSeconds = route.properties.time;
    
    // Format duration
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    let durationText = '';
    if (hours > 0) {
      durationText = `${hours}h ${minutes}min`;
    } else {
      durationText = `${minutes} min`;
    }

    console.log(`Distance: ${distanceInKm} km, Duration: ${durationText}`);

    return new Response(
      JSON.stringify({
        distanceKm: distanceInKm,
        distanceText: `${distanceInKm.toFixed(1)} km`,
        durationText: durationText,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in calculate-distance function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Replace YOUR_API_KEY with your actual YouTube Data API key
const API_KEY = 'AIzaSyBxgkAIJW3Z7qS2TCiTTVURi8n7aK3E2uc';


const playlists = [  
        {id:'PLoADbtXeHbXW4boCLndNEl1RYyLoi9kuZ',containerId:'2yt1e'},
        {id:'PLemwF4l2Sz9O13oHEuxZIcdFRrrF9hJYe',containerId:'2yt1m'},
        {id:'PLNZylwdJLcQlG07-pnexVtPTdnybmycAu',containerId:'2yt1d'},
        {id:'PL9G2b37WxBAIyALXCsED7LRijWttvoVLu',containerId:'2yt1s'},
        {id:'PLLgRQ5sU_ep_D2a6gWpiXUnI0y6Pu-wug',containerId:'2yt1a'},
        {id:'PLYGJU1U6eacNUn0Zm0KW_-vBokn4ENCFd',containerId:'2yt1r'},
        {id:'PLYGJU1U6eacObkrSVKCPx-uuXyjksl3u5',containerId:'2yt1o'},
        {id:'PLYGJU1U6eacO7enE8RoRos1BeV_q1DdyE',containerId:'2yt2o'},
        {id:'PLoADbtXeHbXX4lhOR7maDazhz-1B294-x',containerId:'2yt2e'},
        {id:'PLemwF4l2Sz9NfnBIl3c243_uiUVOonb2Y',containerId:'2yt2m'},
        {id:'PLYGJU1U6eacMp4TnD-ssZOKgVk_v7iDDt',containerId:'2yt2r'},
        {id:'PLN5tsGx_VvPiIHeV3UgjjVA0wZDO4cU9P',containerId:'2yt2a'},
        {id:'PLNZylwdJLcQk9gSjD_ltbCQmsAIxuFzb6',containerId:'2yt2d'},
        {id:'PL9G2b37WxBALvZk5clzlC9vHEQzOERGXW',containerId:'2yt2s'},
        {id:'PLemwF4l2Sz9P0y1cvEz4VZWT06luSx4LR',containerId:'3yt1m'},
        {id:'PL9G2b37WxBALZdblnmUnF31ty95DePFpB',containerId:'3yt1s'},
        {id:'PLILaWqN-ThzEBtIFhnjsC_chUbdY16yhg',containerId:'3yt1e'},
        {id:'PLN5tsGx_VvPjScG9VaomNU_Z0p6lSnAuB',containerId:'3yt1a'},
        {id:'PLYGJU1U6eacP8NG40FSQskZjzlETVnZx_',containerId:'3yt1o'},
        {id:'PLYGJU1U6eacOEAj0lPS4Ms3EqxriDVnr_',containerId:'3yt1r'},
        {id:'PLNZylwdJLcQl-9NTLBRJoilSigt_1hWT7',containerId:'3yt1d'},
        {id:'PLNZylwdJLcQnQC3KoCko75ATPRuUR2o-f',containerId:'3yt2d'},
        {id:'PL9G2b37WxBAJ8wOJ3nMMLD7Ih7-FJyjn9',containerId:'3yt2s'},
        {id:'PLemwF4l2Sz9OAlycWqY1X00N-5EVT_ljY',containerId:'3yt2m'},
        {}



];

// Function to fetch playlist videos
async function fetchPlaylistVideos(playlistId, containerId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            displayEmbeddedVideos(data.items, containerId);
        } else {
            console.error(`No items found for playlist ID: ${playlistId}`);
        }
    } catch (error) {
        console.error(`Error fetching playlist videos for ID: ${playlistId}`, error);
    }
}

// Function to display embedded videos on the webpage
function displayEmbeddedVideos(videos, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    videos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        const title = video.snippet.title;

        const videoElement = document.createElement('div');
        videoElement.className = 'content';

        videoElement.innerHTML = `
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

        container.appendChild(videoElement);
    });
}

// Automatically fetch and display videos for all playlists
document.addEventListener('DOMContentLoaded', () => {
    playlists.forEach(playlist => {
        fetchPlaylistVideos(playlist.id, playlist.containerId);
    });
});


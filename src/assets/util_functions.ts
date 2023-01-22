export function transformBubbleChartData(data: any[]){
    if(data.length != 0){
        const artistCount = {};
        data.forEach(elm => {
            elm.artists.forEach((artist: any[]) => {
                // @ts-ignore
                artistCount[artist.name] = (artistCount[artist.name as keyof any ] || 0) + 1;
            })
        })
        const sortable = [];
        for(let artist in artistCount){
            // @ts-ignore
            sortable.push([artist, artistCount[artist]])
        }
        sortable.sort((a, b) => b[1] - a[1]);
        const finalData: {label: String, value: number}[] = []
        for(let i = 0; i < 49; i++){
            finalData.push({label: sortable[i][0], value: sortable[i][1]})
        }
        return finalData;
    }
    return []
}

export function transformPlaylistBubbleChartData(data: any[]){
    if(data.length != 0){
        const artistCount = {};
        data.forEach(elm => {
            elm.track.artists.forEach((artist: any[])=> {
                // @ts-ignore
                artistCount[artist.name] = (artistCount[artist.name] || 0) + 1;
            })
        })
        const sortable = [];
        for(let artist in artistCount){
            // @ts-ignore
            sortable.push([artist, artistCount[artist]])
        }
        sortable.sort((a, b) => b[1] - a[1]);
        const finalData: {label: String, value: number}[] = []
        for(let i = 0; i < sortable.length; i++){
            finalData.push({label: sortable[i][0], value: sortable[i][1]})
        }
        return finalData;
    }
    return [];
}
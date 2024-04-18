
import Chart from 'chart.js/auto';

const renderLineGraph = (requests, totalHeadMovement, startTrack, cylinderList, seekTime) => {
    const canvas = document.getElementById('lineGraph');
    const ctx = canvas.getContext('2d');

    if (canvas.chart) {
      canvas.chart.data.labels = requests;
      canvas.chart.data.datasets[0].data = requests;
      canvas.chart.options.scales.y.min = startTrack;
      canvas.chart.options.scales.y.max = cylinderList;
      canvas.chart.update();
    } else {
      const lineGraph = new Chart(ctx, {
        type: 'line',
        data: {
          labels: requests,
          datasets: [
            {
              label: 'Requests',
              data: requests,
              pointRadius: 5,
              backgroundColor: 'rgb(240, 248, 255)',
              borderColor: 'rgb(52, 152, 219)',
              borderWidth: 3,
              fill: false,
            },
          ],
        },
        options: {
          legend: {
            labels: {
              color: 'rgb(240, 248, 255)',
            }
          },
          scales: {
            y: {
              grid: {
                color: 'rgb(245, 245, 245)',
              },
              beginAtZero: true,
              min: startTrack,
              max: cylinderList,
              ticks: {
                color: 'rgb(245, 245, 245)',
              },
            },
            x: {
              grid: {
                color: 'rgb(245, 245, 245)',
              },
              beginAtZero: true,
              ticks: {
                color: 'rgb(245, 245, 245)',
              },
            }
          },
        },
      });
  
      canvas.chart = lineGraph;
    }
    const thmElement = document.getElementById('totalHeadMovement');
    const stElement = document.getElementById('seekTime');

    thmElement.textContent = `${totalHeadMovement}`;
    stElement.textContent = `${seekTime}`;
  };
  
export const handleSubmit = (e, startingTrack, endingTrack, initialHeadPosition, previousHeadPosition, armMovement, diskRequests, setDiskRequests, algorithm) => {
    e.preventDefault();
    const requests = diskRequests.split(' ').map((request) => parseInt(request.trim()));
    const direction = parseInt(previousHeadPosition) > parseInt(initialHeadPosition) ? 'downwards' : 'upwards';
    const cylinderList = parseInt(endingTrack) + 1;
    const endTrack = parseInt(endingTrack);
    const startTrack = parseInt(startingTrack);
  
    console.log('Raw Requests:', requests);
    console.log('Sorted ASC Requests:', requests);
    console.log('Algorithm', algorithm);
    console.log('Direction:', direction);

    if (algorithm == 'fifo') {

        requests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Requests:', requests);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);
    
        for (let i = 0; i < requests.length; i++) {
            const currentRequest = requests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }
        
        let insertIndex = 0;
        for (let i = 1; i < requests.length; i++) {
            if ((requests[i] > previousHeadPosition && requests[i + 1] < previousHeadPosition) ||
                (requests[i] < previousHeadPosition && requests[i + 1] > previousHeadPosition)) {
                insertIndex = i + 1;
                break;
            }
        }
        requests.splice(insertIndex, 0, parseInt(previousHeadPosition));

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);

        renderLineGraph(requests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
        
    } else if (algorithm == 'sstf') {

        const sortedRequests = requests.sort((a, b) => a - b);
        sortedRequests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Request:', sortedRequests);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);

        for (let i = 0; i < sortedRequests.length - 1; i++) {
          const difference1 = Math.abs(sortedRequests[i] - sortedRequests[i + 1]);
          console.log('diff1:', sortedRequests);
          const difference2 = Math.abs(sortedRequests[i] - sortedRequests[i + 2]);
          console.log('diff2:', sortedRequests);
      
          const minDifference = Math.max(difference1, difference2);
      
          if (minDifference === difference1) {
            [sortedRequests[i + 1], sortedRequests[i + 2]] = [
              sortedRequests[i + 2],
              sortedRequests[i + 1],
            ];
          }
        }

        for (let i = 0; i < sortedRequests.length; i++) {
            const currentRequest = sortedRequests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }
    
        let insertIndex = 0;
        for (let i = 1; i < sortedRequests.length; i++) {
            if ((sortedRequests[i] > previousHeadPosition && sortedRequests[i + 1] < previousHeadPosition) ||
                (sortedRequests[i] < previousHeadPosition && sortedRequests[i + 1] > previousHeadPosition)) {
                insertIndex = i + 1;
                break;
            }
        }
        sortedRequests.splice(insertIndex, 0, parseInt(previousHeadPosition));

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);

        renderLineGraph(sortedRequests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
        
    } else if (algorithm == 'scan') {

        const sortedRequests = requests.sort((a, b) => a - b);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);

        const sortedRequestsCopy = [...sortedRequests];
        const sortedUpwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => a - b);
        const sortedDownwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => b - a);

        let arrangedRequests;
        if (direction === 'downwards') {
          arrangedRequests = [...sortedDownwards, startTrack, ...sortedUpwards];
        } else {
          arrangedRequests = [...sortedUpwards, endTrack, ...sortedDownwards];
        }

        arrangedRequests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Request:', arrangedRequests);

        for (let i = 0; i < arrangedRequests.length; i++) {
            const currentRequest = arrangedRequests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }
    
        let insertIndex = 0;
        for (let i = 1; i < arrangedRequests.length; i++) {
            if ((arrangedRequests[i] > previousHeadPosition && arrangedRequests[i + 1] < previousHeadPosition) ||
                (arrangedRequests[i] < previousHeadPosition && arrangedRequests[i + 1] > previousHeadPosition)) {
                insertIndex = i + 1;
                break;
            }
        }
        arrangedRequests.splice(insertIndex, 0, parseInt(previousHeadPosition));

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);

        renderLineGraph(arrangedRequests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
        
    } else if (algorithm == 'cscan') {

        const sortedRequests = requests.sort((a, b) => a - b);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);

        const sortedRequestsCopy = sortedRequests.filter((request) => request !== parseInt(previousHeadPosition));
        const sortedUpwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => b - a);
        const sortedDownwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => b - a);
        const sortedUpwards1 = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => a - b);
        const sortedDownwards1 = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => a - b);

        let arrangedRequests;
        if (direction === 'downwards') {
          arrangedRequests = [...sortedDownwards, startTrack, previousHeadPosition, endTrack, ...sortedUpwards];
        } else {
          arrangedRequests = [...sortedUpwards1, endTrack, previousHeadPosition, startTrack, ...sortedDownwards1];
          console.log('entered here');
        }

        arrangedRequests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Request:', arrangedRequests);

        for (let i = 0; i < arrangedRequests.length; i++) {
            const currentRequest = arrangedRequests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);
        console.log('Direction:', direction);

        renderLineGraph(arrangedRequests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
        
    } else if (algorithm == 'look') {

        const sortedRequests = requests.sort((a, b) => a - b);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);

        const sortedRequestsCopy = [...sortedRequests];
        const sortedUpwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => a - b);
        const sortedDownwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => b - a);

        let arrangedRequests;
        if (direction === 'downwards') {
          arrangedRequests = [...sortedDownwards, ...sortedUpwards];
        } else {
          arrangedRequests = [...sortedUpwards, ...sortedDownwards];
        }

        arrangedRequests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Request:', arrangedRequests);

        for (let i = 0; i < arrangedRequests.length; i++) {
            const currentRequest = arrangedRequests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }
    
        let insertIndex = 0;
        for (let i = 1; i < arrangedRequests.length; i++) {
            if ((arrangedRequests[i] > previousHeadPosition && arrangedRequests[i + 1] < previousHeadPosition) ||
                (arrangedRequests[i] < previousHeadPosition && arrangedRequests[i + 1] > previousHeadPosition)) {
                insertIndex = i + 1;
                break;
            }
        }
        arrangedRequests.splice(insertIndex, 0, parseInt(previousHeadPosition));

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);

        renderLineGraph(arrangedRequests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
      
    } else if (algorithm == 'clook') {

        const sortedRequests = requests.sort((a, b) => a - b);
        let totalHeadMovement = 0;
        let currentHeadPosition = parseInt(initialHeadPosition);

        let insertIndex = 0;
        for (let i = 1; i < sortedRequests.length; i++) {
            if ((sortedRequests[i] > previousHeadPosition && sortedRequests[i + 1] < previousHeadPosition) ||
                (sortedRequests[i] < previousHeadPosition && sortedRequests[i + 1] > previousHeadPosition)) {
                insertIndex = i + 1;
                break;
            }
        }
        sortedRequests.splice(insertIndex, 0, parseInt(previousHeadPosition));

        const sortedRequestsCopy = [...sortedRequests];
        const sortedUpwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => a - b);
        const sortedDownwards = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => b - a);
        const sortedUpwards1 = sortedRequestsCopy.filter(sortedRequests => sortedRequests >= currentHeadPosition).sort((a, b) => b - a);
        const sortedDownwards1 = sortedRequestsCopy.filter(sortedRequests => sortedRequests < currentHeadPosition).sort((a, b) => a - b);

        let arrangedRequests;
        if (direction === 'downwards') {
          arrangedRequests = [...sortedDownwards, ...sortedUpwards1];
        } else {
          arrangedRequests = [...sortedUpwards, ...sortedDownwards1];
        }

        arrangedRequests.unshift(parseInt(initialHeadPosition));
        console.log('Sorted Request:', arrangedRequests);

        for (let i = 0; i < arrangedRequests.length; i++) {
            const currentRequest = arrangedRequests[i];
            totalHeadMovement += Math.abs(currentRequest - currentHeadPosition);
            currentHeadPosition = currentRequest;
        }

        const seekTime = (cylinderList * armMovement) / totalHeadMovement;
        const roundedSeekTime = Number(seekTime.toFixed(2));

        console.log('Total Head Movement:', totalHeadMovement);
        console.log('Seek Time:', seekTime);

        renderLineGraph(arrangedRequests, totalHeadMovement, startTrack, cylinderList, roundedSeekTime);
    
    }
};
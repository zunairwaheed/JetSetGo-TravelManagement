export const dataLineTemplate = {
    labels: ['Users', 'Bookings', 'Tours'],
    datasets: [
        {
            label: 'Sales',
            data: [0, 0, 0, 0, 0, 0, 0], // Initial empty data
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
        },
    ],
};

export const dataBarTemplate = {
    labels: ['Users', 'Bookings', 'Tours'],
    datasets: [
        {
            label: 'Quantity',
            data: [0, 0, 0], // Initial empty data
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};

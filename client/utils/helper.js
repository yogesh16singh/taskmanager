export const isValidEmail = function(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { // 'en-GB' for day/month/year format
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false  // For 24-hour format
    });
}
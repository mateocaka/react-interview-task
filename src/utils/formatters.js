export const formatJobId = (id) => {
    return id.length > 8 ? `${id.slice(0, 8)}...` : id;
};

export const formatItemCount = (count) => {
    return `${count} item${count !== 1 ? 's' : ''}`;
};

export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
export const getDateOnly = (dateStr: string) => {

    // Parse the date and convert to local timezone
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');


    // Create date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
};
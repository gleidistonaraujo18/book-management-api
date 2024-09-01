export const isEmptyObject = (obj: any): boolean => {
    if (!obj) {
        return true;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return true;
    }

    for (const key of keys) {
        const value = obj[key];
        if (value !== "" && value != null) {
            return false;
        }
    }

    return true;
};

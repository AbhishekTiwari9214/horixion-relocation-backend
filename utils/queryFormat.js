async function format(query, ...values) {
    return new Promise(async (resolve, reject) => {
        try {
            let index = 0;
            const formattedQuery = query.replace(/%L/g, () => {
                if (index >= values.length) {
                    throw new Error("Insufficient values provided for placeholders.");
                }

                const value = values[index++];
                if (typeof value === "string") {
                    return `'${value}'`; // Enclose strings in single quotes
                }
                return value;
            });
            resolve(formattedQuery);
        } catch (err) {
            reject(err.message);
        }
    });
}

module.exports = format;

import { ZodError } from "zod";

interface FormattedError {
    path: string | number;
    message: string;
}

const formatErrors = (errors: ZodError): FormattedError[] => {
    const uniqueErrors = new Map<string | number, string>();

    for (const error of errors.issues) {
        const path = error.path[0];

        // add only first message for each path
        if (!uniqueErrors.has(path)) {
            uniqueErrors.set(path, error.message);
        }
    }

    return Array.from(uniqueErrors.entries()).map(([path, message]) => ({
        path,
        message
    }));
}


export { formatErrors };
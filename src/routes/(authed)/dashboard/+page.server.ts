export const load = async ({locals}) => {
    const records = await locals.pb.collection('history').getFullList({
    });
    return{
        records
    }
};
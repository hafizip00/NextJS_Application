function UserIdPage (porps){
    return (
        <h1>{porps.userID}</h1>
    )
}

export default UserIdPage


export async function getServerSideProps(context){
    const {params} = context
    
    const userId = params.uid
    return {
        props : {
            userID : "_userID "+userId
        }
    }
}
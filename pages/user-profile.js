function UserProfile(props){
    return (
        <h1>
            {props.username}
        </h1>
    )
}

export default UserProfile


export async function getServerSideProps(context){
    const {req , paramas ,res} = context

    return{
        props : {
            username : "Inayat"
        }
    }
}
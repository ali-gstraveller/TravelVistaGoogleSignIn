import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { present,notpresent }  from '../../store/userSlice';
import { useRouter } from 'next/router';

export default function Dashboard() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();

    console.log('userdata=>', session );

   
    if (session){
        dispatch(present(session?.user))
    }

    const signInHandler = ()=>{
        signIn();
    }

    const signOutHandler = ()=>{
        signOut()  ;
        dispatch(notpresent()) 
    }
    

    return (<div>
        <h4 style={{border:"1px solid black" ,width:'90px',padding:"2px"
         }} > Travel Vista </h4>
        {!session ? (    
        <>  
        <button style={{ marginLeft: '1150px' }} onClick={() =>   signInHandler()   }   >Sign in</button>
<h1 style={{ textAlign: 'center' }} > Welcome, Kindly Login to Continue </h1>
        </>
        ) : (
        <>
            <button style={{ marginLeft: '1150px' }} onClick={() => { signOutHandler()          }    }>Sign out</button>
            <h1 style={{ textAlign: 'center' }} > Welcome, {session.user.name} !  </h1>
        </>
        )}
        <div style={{ backgroundImage:  'url("/cover.webp")',width:'1250px',height:"700px" }} >
            {/* <h1 style={{color:"white", marginLeft:"450px" }} >Kindly enter your preference !</h1> */}
            <input placeholder="where to ?" type="text" style={{ borderRadius:"15px", padding:'9px',marginLeft:"550px" ,marginTop:"50px"   }} />
            <button  style={{ borderRadius:"15px", padding:'9px'}}> Submit </button>    
        </div>
    </div>
    )
}
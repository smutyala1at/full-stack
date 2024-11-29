import {jobsAtom, messagingAtom, networkAtom, notificationAtom, totalNotificationCount} from "./store/atoms/linkedinAtoms"
import {useRecoilValue, RecoilRoot} from "recoil"

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )

}

function MainApp(){

  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const messagingAtomCount = useRecoilValue(messagingAtom);
  const notificationsAtomCount = useRecoilValue(notificationAtom);
  const totalCount = useRecoilValue(totalNotificationCount);

  return (
    <div>
      <div><button>Home</button></div>
      <div><button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button></div>
      <div><button>Jobs ({jobsAtomCount})</button></div>
      <div><button>Messaging ({messagingAtomCount})</button></div>
      <div><button>Notifications ({notificationsAtomCount})</button></div>
      <div><button>Me ({totalCount})</button></div>
    </div>
  )
}

export default App

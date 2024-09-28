import useScreen from '@/components/custom-hooks/useScreenHook/useScreenHook';
import Dialog from '@mui/material/Dialog';

export default function DialogModel({
    isOpen = false,
    children
}){
    const isMobile = useScreen()
    return (
        <Dialog open={isOpen} PaperProps={{
            style : {
                "minWidth" : isMobile ? "50%" : "35%",
                "minHeight" : "30%",
                "maxHeight" : "60%"
            }
        }}>
            {children}
        </Dialog>
    )
}
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Form from "../../Core/components/Form";
import FormInput from "../../Core/components/FormInput";
import {Close, SaveAltOutlined} from "@mui/icons-material";
import ProjectSelect from "../../Project/components/ProjectSelect";

type NewBugModalProps = {
    open: boolean,
    onClose: Function
}

type NewBugStateType = {
    title: string,
    description: string,
    projectId: number|null
}

const NewBugModal = ({open, onClose}: NewBugModalProps) => {
    const [state, setState] = useState<NewBugStateType>({
        title: '',
        description: '',
        projectId: null
    })

    const updateData = (key, value) => {
        const newState = {
            ...state,
            [key]: value
        }

        setState(newState)
    }

    const saveNewBug = () => {
        // @todo save the bug here
        onClose()
    }

    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <DialogTitle>CreateBug</DialogTitle>
            <DialogContent dividers>
                <Form>
                    <ProjectSelect onChange={projectId => updateData('projectId', projectId)} />
                    <FormInput label="Bug title" value={state.title} type="text" onChange={e => updateData('title', e.target.value)} />
                    <FormInput label="Description" value={state.description} type="text" multiline rows="7" onChange={e => updateData('description', e.target.value)} />
                </Form>
            </DialogContent>
            <DialogActions sx={{display:"flex", justifyContent:"space-between"}}>
                <Button onClick={onClose}><Close sx={{marginRight: "0.5rem"}} /> Cancel</Button>
                <Button onClick={saveNewBug}><SaveAltOutlined sx={{marginRight: "0.5rem"}}/> Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewBugModal

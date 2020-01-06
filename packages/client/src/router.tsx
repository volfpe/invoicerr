import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Auth from './modules/auth/components/auth'
import Login from './modules/auth/components/login'
import Layout from './components/layout'
import ContactsList from './modules/contacts/components/list'
import AddContact from './modules/contacts/components/add'
import EditContact from './modules/contacts/components/edit'
import EditCompanyInfo from './modules/contacts/components/company-info'
import InvoiceList from './modules/invoices/components/list'
import AddInvoice from './modules/invoices/components/add'
import UserList from './modules/admin/components/list'
import AddUser from './modules/admin/components/add'
import EditUser from './modules/admin/components/edit'
import UserSettings from './modules/settings/components/edit'
import InvoiceDetail from './modules/invoices/components/detail'
import InvoicePdf from './modules/invoices/components/pdf'

const App: React.FC = () => {
    return(
        <Router>
            <Switch>
                
                <Route path="/dashboard"><Layout> Dashboard</Layout></Route>

                <Route path="/contacts/new"><AddContact /></Route>
                <Route path="/contacts/:id"><EditContact /></Route>
                <Route path="/contacts"><ContactsList /></Route>

                <Route path="/company-info"><EditCompanyInfo /></Route>
                <Route path="/invoices/new"><AddInvoice /></Route>
                <Route path="/invoices/pdf/:id"><InvoicePdf /></Route>
                <Route path="/invoices/:id"><InvoiceDetail /></Route>
                <Route path="/invoices"><InvoiceList /></Route>

                <Route path="/admin/new"><AddUser /></Route>
                <Route path="/admin/:id"><EditUser /></Route>
                <Route path="/admin"><UserList /></Route>

                <Route path="/settings"><UserSettings /></Route>
                
                <Route path="/"><Login /></Route>
            </Switch>
        </Router>
    )
}

export default App
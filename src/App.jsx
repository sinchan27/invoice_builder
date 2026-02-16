
import React, { useState,useRef } from "react";
import "animate.css";
import { Drawer, Form, Tooltip, Button, Input, DatePicker, Select, Space, InputNumber, Divider } from "antd";
import { Printer, Plus, Type, Minus , MinusIcon, PlusIcon } from "lucide-react";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import InvoicePreview from "./invoice_view";
import { useReactToPrint } from "react-to-print";
import downloadPDF from "./downloader";
const App = () => {
  const[open,setOpen]=useState(false)
  const[invoice,setInvoice]=useState(null)
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const handleClose=()=>{
    setOpen(false)
  }

  const formSchema=[

    {
     label:'customer name',
     name:'customername',
     require:true
    },
    {
     label:'customer email',
     name:'customeremail',
     require:true
    },
    {
     label:'customer GSTIN',
     name:'customerGSTIN',
     require:true
    },
     {
     label:'customer ADDRESS',
     name:'customerAddrs',
     require:true
    },
     {
     label:'customer Phone',
     name:'customerphone',
     type:'number',
     require:true
    },
     {
     label:'customer origin',
     name:'customerorigin',
     require:true
    },
    {
      label:"choose payment method",
      name:'paymentmethod',
      type:'select',
      require:true,
      options:[
        {label:'BANK TRANSFER', value:'bank'},
        {label:'UPI',value:'upi_transfer'},
        {label:'COD',value:'cash'}
      ]
    },
  
     {
     label:'invoice number',
     name:'invoiceno',
     required:true
    },
     {
     label:'Date',
     name:'date',
     type: 'date',
     required:true
    },
    {
     label:'company name',
     name:'companyname',
     required:true
    },
    {
     label:'company email',
     name:'companyemail',
     required:true
    },
    {
     label:'company GSTIN',
     name:'companyGSTIN',
     required:true
    },
     {
     label:'company ADDRESS',
     name:'companyAddrs',
     required:true
    },
     {
     label:'company Phone',
     name:'companyphone',
     type:'number',
     required:true
    },
     {
     label:'company origin',
     name:'companyorigin',
     required:true
    },{
      label:'transaction id',
      name:'transactionid',
      required: true
      
    },{
      label:'due date',
      name:'duedate',
      required: true
      
    },{
      label:'GST',
      name:'gst',
      required:true
    }



  ]
  const generate=(values)=>{
    values.date=moment(values.date).format('DD-MM-YYYY')
    values.duedate=moment(values.duedate).format('DD-MM-YYYY')
    values.item.forEach(item=>{
     
      item.amount = item.quantity * item.Rate
      item.gst=item.amount * (values.gst/100)
      item.total=item.amount + item.gst
    })

    values.sub=values.item.reduce((accumulator,current)=>accumulator+current.amount,0);
    values.totalgst=values.item.reduce((accumulator,current)=>accumulator+current.gst,0);
    values.grandtotal=values.item.reduce((accumulator,current)=>accumulator+current.total,0);
    console.log(values)
    setInvoice(values)
  }
  return (
     <>
    {invoice && (
      <>
        <InvoicePreview ref={printRef} invoice={invoice} />
       
      </>
    )}
    
    <div className="bg-gray-200 min-h-screen">

      <div className="fixed -translate-y-1/2 top-1/2 left-0 bg-white rounded-r-lg p-6 flex gap-4 shadow-lg no-print">

        <Tooltip title="Create a new invoice">
          <button onClick={()=>setOpen(true)} className="p-2 bg-blue-500 text-white rounded hover:scale-105 transition duration-300 active:scale-80">
            <Plus />
          </button>
        </Tooltip>

        <Tooltip title='PRINT YOUR INVOICE' className="print: hidden">
          <button onClick={()=>{window.print();}} className="p-2 bg-green-500 text-white rounded  hover:scale-105 transition duration-300 active:scale-80" >
          <Printer />
        </button>
        </Tooltip>

      </div>
      <Drawer open={open} onClose={handleClose} title='create a invoice' className="p-2 bg-white text-black " size='large' >
        <div>
          <Form layout='vertical' onFinish={generate} className="grid grid-cols-2 gap-4">
            {
              formSchema.map((item,index)=>{
                if (item.name ==='gst'){
                  return(
                   <Form.Item 
                key={index}
                label={<h1 className="font-medium text-base">{item.label}</h1>}
                name={item.name}
                rules={[{required:item.required}]}>
                  
                  <InputNumber size="large" className="w-full" />
                </Form.Item>
                );
                }
                if (item.type==="date" || item.name==='duedate'){
                   return(
                   <Form.Item 
                key={index}
                label={<h1 className="font-medium text-base">{item.label}</h1>}
                name={item.name}
                rules={[{required:item.require}]}>
                  
                  <DatePicker size="large" className="w-full" />
                </Form.Item>
                );
                }
                 if (item.type==="select"){
                   return(
                   <Form.Item 
                key={index}
                label={<h1 className="font-medium text-base">{item.label}</h1>}
                name={item.name}
                rules={[{required:item.require}]} >
                <Select size="large" 
                className="!w-full" options={item.options} 
                placeholder='choose payment method' />                
                </Form.Item>
                );
                }
                if (item.type==="number"){
                   return(
              <Form.Item 
                key={index}
                label={<h1 className="font-medium text-base">{item.label}</h1>}
                name={item.name}
                rules={[{required:item.require}]}>
                  <Input size="large" />
                  
                </Form.Item>
                );
                }
                 return(
              <Form.Item 
                key={index}
                label={<h1 className="font-medium text-base">{item.label}</h1>}
                name={item.name}
                rules={[{required:item.require}]}>
                  <Input size="large" />
                  
                </Form.Item>
                );

                
              })
            }<br />
            <Divider  size="large" plain className="col-span-2 flex items-center gap-2 my-4 text-decoration-line: line-through;">
             <h2 className="text-lg font-semibold border-b-2 border-black-300 pb-1 w-full">
  Product Details</h2>
  

              </Divider>
          <div className="col-span-2">
            <Form.List name="item">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="col-span-2">
              <Form.Item
                {...restField}
                name={[name, 'item']}
                rules={[{ required: true, message: 'Missing item name' }]}
              >
                <Input placeholder="item Name" className="!w-full"/>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'quantity']}
                rules={[{ required: true, message: 'Missing Qty.' }]}
              >
                <InputNumber placeholder="Qty"  className="!w-full"/>
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'Rate']}
                
                rules={[{ required: true, message: 'Missing Rate.' }]}
              >
                <InputNumber placeholder="Rate" className="!w-full"/>
              </Form.Item>
              <Minus onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<Plus />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    </div>
            <Form.Item>
             <Button
              type="primary"
              htmlType="submit"
                  size="large"
                >
                    Generate
                  </Button>

            </Form.Item>
          </Form>
        </div>

      </Drawer>

    </div>
    </>
  );
};

export default App;

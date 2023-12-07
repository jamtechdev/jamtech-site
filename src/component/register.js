import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Register = () => {
  const navigate = useNavigate();
 const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Invalid characters in name').required('Name is required')
    .test('no-whitespace', 'Name cannot be empty or contain only spaces', value => value && value.trim() !== ''),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    gender: Yup.string().required('Gender is required'),
    check: Yup.boolean()
      .oneOf([true], 'You must accept the terms')
      .required('You must accept the terms'),
  });
const { register, handleSubmit, formState: { errors} } = useForm({
resolver: yupResolver(validationSchema),
 });
const getUserIP = async () => {
   try {
      const response = await axios.get('https://api64.ipify.org?format=json');
      return response.data.ip;
    } catch (error){
      console.error('Error fetching user IP:', error);
      return null;
    }
  };
 const onSubmit = async (data) => {
    try {
     const userIP = await getUserIP();
     const userAgent = window.navigator.userAgent;
     const currentTime = new Date().toISOString();
       const userDataWithInfo = {
        ...data,
        ip: userIP,
        os: userAgent,
        time: currentTime,
      };
    const response = await axios.post('http://localhost:3000/users', userDataWithInfo);
     toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/file');
      console.log(response);
    } catch (error) {
      toast.error('This user is registered ' + error.message);
    }
  };
   return (
    <section className='banner-content'>
      <div className="container-fluid">
        <div className="row row-stretch">
          <div className="col-md-6 col-box ">
       </div>
          <div className="col-md-6 col-box second">
            <div className='form-container'>
              <Form>
              <h1 className='form-title'>Register Here</h1>
                <p className='sub__title'>Enter your information to register for the coding contest</p>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter name" {...register("name", { required: true })} />
                  <Form.Text className="text-muted">{errors.name?.message}</Form.Text>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
                  <Form.Text className='text-muted'>{errors.email?.message}</Form.Text>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
                  <Form.Text className='text-muted'>{errors.password?.message}</Form.Text>
                </Form.Group>
                <Form.Select aria-label="Default select example" {...register("gender", { required: true })}>
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Group className="mt-3 mb-3" controlId="formBasicCheckbox">
                  <Form.Check className='text-black' type="checkbox" label="I Agree" {...register("check", { required: true })} />
                  <Form.Text className='text-muted'>{errors.check?.message}</Form.Text>
          </Form.Group>
          <Button className="w-100"
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          >                                               
          Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;


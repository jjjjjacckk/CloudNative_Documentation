import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router';
import signup from '@/views/Signup.vue'
  

// Mock the DatePicker component
jest.mock('vue3-datepicker', () => ({
    // Create a functional component as the mock implementation
    functional: true,
    // render(h, { slots }) {
    //   return slots.default();
    // },
    render(h) {
      return h('div', 'Mocked DatePicker');
    },
  }));
  
  
  
  // mock the Router
  const mockRouter = {
    push: jest.fn()
  }
  
  // mock the Route
  const mockRoute = {
    params: {
        id: '647df1c704778a001a263e75',
    }
  }
  
  // mock the uid
  const mockUid = '647df1c704778a001a263e75'
describe('Signup.vue', () => {
    it('should update the signupUser', async () => {

        const wrapper = mount(signup);
        const vm = wrapper.vm;

        // set value of signupUser
        vm.user.account = 'test@example.com';
        vm.user.password = 'password123';
        vm.user.username = 'testname';

        // assert value of loginUser 
        expect(vm.user.account).toBe('test@example.com');
        expect(vm.user.password).toBe('password123');
        expect(vm.user.username).toBe('testname');

    });

    it('cannot signup if user account is empty', async () => {
        const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        
        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('');
    });

    it('cannot signup if user password is empty', async () => {
        const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        
         // Get user password
         const passwordName= wrapper.find('#password')
         // Modify the password
         await passwordName.setValue('');
 
         // Find the button in the modal-footer
         const button = wrapper.find('button');
         // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('');
    });

    it('cannot signup if user name is empty', async () => {
        const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        
         // Get user name
         const name= wrapper.find('#password')
         // Modify the name
         await name.setValue('');
 
         // Find the button in the modal-footer
         const button = wrapper.find('button');
         // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('');
    });

    it('signup btn is enabled if account and password are filled', async () => {
        const wrapper = mount(signup, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        // Get user account
        const accountName= wrapper.find('#account')

        // Modify the account
        await accountName.setValue('test');
        
        // Get user account
        const password= wrapper.find('#password')
        // Modify the account
        await password.setValue('123');

        // Get user name
        const username= wrapper.find('#text')
        // Modify the account
        await username.setValue('name');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is enabled
        expect(button.attributes('disabled')).toBeUndefined();
    });
})
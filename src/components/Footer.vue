<template>
  <div class="container">
    <footer class="section-p1 footer-over">
      <div class="col">
        <RouterLink to="/"
          ><img src="@/assets/images/logo.svg" class="logo" alt="" /><span class="lgs"
            >TellHome</span
          ></RouterLink>
  
        <h4>Contact</h4>
        <p><strong>Adress: </strong> Neapol street 26, Baku</p>
        <p><strong>Phone: </strong> +001 02345698</p>
        <p><strong>Hours: </strong> 10:00 - 18:00, Mon - Sat</p>
        <div class="follow">
          <h4>Follow us</h4>
          <div class="icon">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-pinterest-p"></i>
            <i class="fab fa-youtube"></i>
          </div>
        </div>
      </div>

      <div class="col">
        <h4>About</h4>
        <RouterLink to="" >About us</RouterLink>
        <RouterLink to="" >Delivery Information</RouterLink>
        <RouterLink to="" >Privacy Policy</RouterLink>
        <RouterLink to="" >Terms & Conditions</RouterLink>
        <RouterLink to="" >Contact Us</RouterLink>
      </div>

      <div class="col">
        <h4>My Account</h4>
        <RouterLink to="" >Sign in</RouterLink>
        <RouterLink to="" >View Cart</RouterLink>
        <RouterLink to="" >My Wishlist</RouterLink>
        <RouterLink to="" >Track My Order</RouterLink>
        <RouterLink to="" >Help</RouterLink>
      </div>

      <div class="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <p>Secured Payment Gateways</p>
        <img src="@/assets/images/pay.png" alt="" />
      </div>

      <div class="copyright">
        <p>@ 2023, Tello etc By Y.Shalala</p>
      </div>
    </footer>
  </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width:477px) {
      gap: 10px !important;
    }
    
    .col {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-bottom: 20px;
    }
    .logo {
       
    }
    h4 {
        font-size: 14px;
        padding-bottom: 20px;
        font-weight: 700;
    }
    p {
        font-size: 13px;
        margin: 0 0 8px 0;

    }
    a {
        font-size: 13px;
        text-decoration: none;
        color: #222;
        margin-bottom: 10px;
         a:hover{
                color: #088178;
            }
            span {
                 color: #2DD06E;
   font-size: 34px;
   font-style: normal;
    font-weight: 500;
      line-height: 40px; 

       @media (max-width:477px) {
     font-size: 20px !important;
    }

      
            }
    }
    .follow {
        margin-top: 20px;
        i {
            color: #465b52;
            padding-right: 4px;
            cursor: pointer;
        }
         i:hover{
                color: #088178;
            }
    }
    .install img {
        margin: 10px 0 15px 0;
    }
    .copyright {
        width: 100%;
        text-align: center;
    }
   
}


</style>

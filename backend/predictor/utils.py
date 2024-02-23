def Diastole(p2):
      if p2<60:
        return ['1.0','0.0','0.0','0.0']
      elif p2>=60 and p2<85:
        return ['0.0','1.0','0.0','0.0']
      elif p2>=85  and p2<90:
        return ['0.0','0.0','1.0','0.0']
      else:
        return ['0.0','0.0','0.0','1.0']


def lh(z):
      if z<2:
        return ['1.0','0.0','0.0']
      elif z>10:
        return ['0.0','1.0','0.0']
      else:
        return ['0.0','0.0','1.0']

def Systole(p1):
      if p1<110:
        return ['1.0','0.0','0.0','0.0']
      elif p1>=110 and p1<130:
        return ['0.0','1.0','0.0','0.0']
      elif p1>=130  and p1<140:
        return ['0.0','0.0','1.0','0.0']
      else:
        return ['0.0','0.0','0.0','1.0']

def BMI_Insights(x):
                # bmi_a,bmi_b,bmi_c 
      if x<18:
        return ['1.0','0.0','0.0']
      elif x>=18 and x<26:
        return ['0.0','1.0','0.0']
      else:
        return ['0.0','0.0','1.0']
import com.nomagic.magicdraw.core.Application;
import com.nomagic.magicdraw.core.Project;
import com.nomagic.magicdraw.openapi.uml.SessionManager;
import com.nomagic.magicdraw.openapi.uml.ModelElementsManager;
import com.nomagic.uml2.ext.jmi.helpers.StereotypesHelper;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Class;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Property;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Element;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Package;

public class UpdateClassAndAttribute {
    
    public static void main(String[] args) {
        // Get the current project
        Project project = Application.getInstance().getProject();
        
        // Start a session for model modifications
        SessionManager.getInstance().createSession("Update Class and Attribute");
        
        try {
            // Find the class to modify (replace "MyClass" with the actual class name)
            Class classToModify = findClass(project, "MyClass");
            
            if (classToModify != null) {
                // Update class properties
                updateClass(classToModify, "NewClassName", "Updated class documentation");
                
                // Find attribute to modify (replace "myAttribute" with the actual attribute name)
                Property attributeToModify = findAttribute(classToModify, "myAttribute");
                
                if (attributeToModify != null) {
                    // Update attribute properties
                    updateAttribute(attributeToModify, "newAttributeName", "Updated attribute documentation", "String");
                }
            }
            
            // Commit the changes
            SessionManager.getInstance().closeSession();
        } catch (Exception e) {
            // If there's an error, cancel the session
            SessionManager.getInstance().cancelSession();
            e.printStackTrace();
        }
    }
    
    private static Class findClass(Project project, String className) {
        // Get the root package
        Package rootPackage = project.getPrimaryModel();
        
        // Recursively search for the class
        for (Element element : rootPackage.getOwnedElement()) {
            if (element instanceof Class && ((Class) element).getName().equals(className)) {
                return (Class) element;
            } else if (element instanceof Package) {
                // Search in subpackages
                Class foundClass = searchInPackage((Package) element, className);
                if (foundClass != null) {
                    return foundClass;
                }
            }
        }
        
        return null;
    }
    
    private static Class searchInPackage(Package pkg, String className) {
        for (Element element : pkg.getOwnedElement()) {
            if (element instanceof Class && ((Class) element).getName().equals(className)) {
                return (Class) element;
            } else if (element instanceof Package) {
                // Search in subpackages
                Class foundClass = searchInPackage((Package) element, className);
                if (foundClass != null) {
                    return foundClass;
                }
            }
        }
        
        return null;
    }
    
    private static Property findAttribute(Class cls, String attributeName) {
        for (Property property : cls.getAttribute()) {
            if (property.getName().equals(attributeName)) {
                return property;
            }
        }
        
        return null;
    }
    
    private static void updateClass(Class cls, String newName, String newDocumentation) {
        // Update class name
        cls.setName(newName);
        
        // Update documentation
        ModelElementsManager.getInstance().updateDocumentation(cls, newDocumentation);
    }
    
    private static void updateAttribute(Property attribute, String newName, String newDocumentation, String newType) {
        // Update attribute name
        attribute.setName(newName);
        
        // Update documentation
        ModelElementsManager.getInstance().updateDocumentation(attribute, newDocumentation);
        
        // Update type (if needed)
        // This is a simplified example - you'd need to find the proper Type object
        // ModelElementsManager.getInstance().setType(attribute, newTypeElement);
    }
}



import com.nomagic.magicdraw.core.Application;
import com.nomagic.magicdraw.core.Project;
import com.nomagic.magicdraw.openapi.uml.ModelElementsManager;
import com.nomagic.magicdraw.openapi.uml.ReadOnlyElementException;
import com.nomagic.magicdraw.uml.Finder;
import com.nomagic.uml2.ext.jmi.helpers.ModelHelper;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Class;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Property;
import com.nomagic.uml2.ext.magicdraw.classes.mdkernel.Type;

public class UpdateElementExample {
    public static void updateClassAndAttribute() {
        Project project = Application.getInstance().getProject();
        
        // Start a transaction
        project.getRepository().beginTransaction();
        
        try {
            // Find the class by name (assuming it exists)
            Class myClass = Finder.byQualifiedName().find(project, "MyPackage::MyClass");
            
            // Update class name
            myClass.setName("UpdatedClassName");
            
            // Find attribute
            Property attribute = null;
            for (Property prop : myClass.getOwnedAttribute()) {
                if ("oldAttributeName".equals(prop.getName())) {
                    attribute = prop;
                    break;
                }
            }
            
            if (attribute != null) {
                // Update attribute name
                attribute.setName("newAttributeName");
                
                // Update attribute type (assuming String type exists)
                Type stringType = Finder.byQualifiedName().find(project, "UML Standard Profile::UML2 Metamodel::String");
                if (stringType != null) {
                    attribute.setType(stringType);
                }
                
                // Set visibility
                attribute.setVisibility(ModelHelper.getVisibilityKind("private"));
                
                // Set multiplicity
                ModelHelper.setMultiplicity(1, 1, attribute);
            }
            
            // Commit the transaction
            project.getRepository().commitTransaction();
            
        } catch (ReadOnlyElementException e) {
            // Handle exception for read-only elements
            project.getRepository().rollbackTransaction();
            e.printStackTrace();
        } catch (Exception e) {
            // Handle other exceptions
            project.getRepository().rollbackTransaction();
            e.printStackTrace();
        }
    }
}





Using SessionManager

  // Start a named session
SessionManager.getInstance().createSession("My Model Update Session");

try {
    // Perform model modifications here
    
    // Successfully complete the session
    SessionManager.getInstance().closeSession();
} catch (Exception e) {
    // Cancel session if something goes wrong
    SessionManager.getInstance().cancelSession();
    e.printStackTrace();
}


Using Repository Transactions
  Project project = Application.getInstance().getProject();
project.getRepository().beginTransaction();

try {
    // Perform model modifications here
    
    // Commit changes
    project.getRepository().commitTransaction();
} catch (Exception e) {
    // Rollback changes
    project.getRepository().rollbackTransaction();
    e.printStackTrace();
}


Finding Elements in the Model
  Using Finder Class
  // Find by qualified name
Class myClass = Finder.byQualifiedName().find(project, "MyPackage::MyClass");

// Find by ID
Element element = Finder.byID().find(project, "element_id_string");

// Find by stereotype
Collection<Element> elements = Finder.byStereotype()
    .find(project, StereotypesHelper.getStereotype(project, "Block"));


Using Model Navigation

  // Get primary model (root package)
Package rootPackage = project.getPrimaryModel();

// Navigate through owned elements
for (Element element : rootPackage.getOwnedElement()) {
    // Process elements
}

// Get all elements of a specific type
for (Class cls : project.getModel().getOwnedElement().stream()
        .filter(e -> e instanceof Class)
        .map(e -> (Class) e)
        .collect(Collectors.toList())) {
    // Process classes
}

Detailed Class Modifications
Class Properties

  // Basic properties
myClass.setName("NewClassName");
myClass.setVisibility(VisibilityKindEnum.PUBLIC);
myClass.setIsAbstract(true);

// Documentation
ModelElementsManager.getInstance().updateDocumentation(myClass, "New documentation text");

// Set owner/container
Package targetPackage = Finder.byQualifiedName().find(project, "TargetPackage");
if (targetPackage != null) {
    ModelElementsManager.getInstance().changeOwner(myClass, targetPackage);
}




Working with Stereotypes
  // Apply a stereotype
Stereotype blockStereotype = StereotypesHelper.getStereotype(project, "Block");
StereotypesHelper.addStereotype(myClass, blockStereotype);

// Remove a stereotype
StereotypesHelper.removeStereotype(myClass, blockStereotype);

// Check if stereotype is applied
boolean hasStereotype = StereotypesHelper.hasStereotype(myClass, blockStereotype);

// Set stereotype property value
StereotypesHelper.setStereotypePropertyValue(myClass, blockStereotype, "isEncapsulated", true);

///Detailed Attribute Modifications
///Creating a New Attribute

// Create a new property (attribute)
Property newAttribute = project.getElementsFactory().createPropertyInstance();
newAttribute.setName("newAttribute");

// Set type
Type stringType = Finder.byQualifiedName().find(project, "UML Standard Profile::UML2 Metamodel::String");
newAttribute.setType(stringType);

// Set multiplicity
ModelHelper.setMultiplicity(0, 1, newAttribute); // 0..1
// OR
ModelHelper.setMultiplicity(1, -1, newAttribute); // 1..*

// Set visibility
newAttribute.setVisibility(VisibilityKindEnum.PRIVATE);

// Add to class
myClass.getOwnedAttribute().add(newAttribute);

////Modifying Existing Attributes

// Find the attribute
Property attribute = myClass.getOwnedAttribute().stream()
    .filter(p -> "oldName".equals(p.getName()))
    .findFirst()
    .orElse(null);

if (attribute != null) {
    // Update name
    attribute.setName("newName");
    
    // Update type
    Type intType = Finder.byQualifiedName().find(project, "UML Standard Profile::UML2 Metamodel::Integer");
    attribute.setType(intType);
    
    // Set as ID (primary key)
    attribute.setIsID(true);
    
    // Set default value
    ValueSpecification defaultValue = project.getElementsFactory().createLiteralStringInstance();
    ((LiteralString)defaultValue).setValue("default");
    attribute.setDefaultValue(defaultValue);
    
    // Set derived
    attribute.setIsDerived(true);
    
    // Set readonly
    attribute.setIsReadOnly(true);
    
    // Set ordered
    attribute.setIsOrdered(true);
    
    // Set unique
    attribute.setIsUnique(true);
}


////Working with Property Types
// Get available primitive types
Type integerType = project.getElementsFactory().getBuiltInType("integer");
Type stringType = project.getElementsFactory().getBuiltInType("string");
Type booleanType = project.getElementsFactory().getBuiltInType("boolean");
Type realType = project.getElementsFactory().getBuiltInType("real");

// Create an enumeration type
Enumeration enumeration = project.getElementsFactory().createEnumerationInstance();
enumeration.setName("MyEnum");

// Add literals to enumeration
EnumerationLiteral literal1 = project.getElementsFactory().createEnumerationLiteralInstance();
literal1.setName("Value1");
enumeration.getOwnedLiteral().add(literal1);

EnumerationLiteral literal2 = project.getElementsFactory().createEnumerationLiteralInstance();
literal2.setName("Value2");
enumeration.getOwnedLiteral().add(literal2);

// Assign enumeration as type
attribute.setType(enumeration);



////Event Handling for Changes
//MagicDraw provides an event system to detect model changes:

// Create event listener for element changes
public class MyElementListener implements MDElementListener {
    @Override
    public void elementChanged(MDElementEvent event) {
        if (event.getSource() instanceof Class) {
            Class cls = (Class) event.getSource();
            System.out.println("Class changed: " + cls.getName());
        }
    }
}

// Register event listener
project.addElementsListener(new MyElementListener());

///SysML-Specific Extensions
If you're working with SysML models in MagicDraw:
// Create a SysML Block
Stereotype blockStereotype = StereotypesHelper.getStereotype(project, "Block");
Class block = project.getElementsFactory().createClassInstance();
block.setName("MyBlock");
StereotypesHelper.addStereotype(block, blockStereotype);

// Create a block property (part property)
Property part = project.getElementsFactory().createPropertyInstance();
part.setName("myPart");
part.setType(block);
StereotypesHelper.addStereotype(part, StereotypesHelper.getStereotype(project, "PartProperty"));

// Set stereotype-specific properties
StereotypesHelper.setStereotypePropertyValue(block, blockStereotype, "isEncapsulated", true);


/////Batch Processing
For bulk updates, you can optimize performance:
List<Element> elementsToUpdate = new ArrayList<>();
// Populate list with elements to update

// Start a single transaction for all changes
project.getRepository().beginTransaction();

try {
    for (Element element : elementsToUpdate) {
        if (element instanceof Class) {
            Class cls = (Class) element;
            // Update class properties
        }
    }
    project.getRepository().commitTransaction();
} catch (Exception e) {
    project.getRepository().rollbackTransaction();
    e.printStackTrace();
}
  
